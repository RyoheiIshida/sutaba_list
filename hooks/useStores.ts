import { useState, useCallback } from 'react';
import { Store, StoreFilters as StoreFiltersType } from '@/lib/types/store';
import { calculateDistance } from '@/lib/utils/geolocation';

interface UseStoresResult {
  stores: Store[];
  loading: boolean;
  error: string | null;
  fetchStores: (filters?: StoreFiltersType, userLocation?: { lat: number; lng: number }, sortByDistance?: boolean) => Promise<void>;
}

export function useStores(): UseStoresResult {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = useCallback(async (
    filters: StoreFiltersType = {},
    userLocation?: { lat: number; lng: number },
    sortByDistance: boolean = false
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.search) params.append('search', filters.search);
      if (filters.hasPowerOutlet !== undefined) params.append('hasPowerOutlet', filters.hasPowerOutlet.toString());
      if (filters.toiletCongestion) params.append('toiletCongestion', filters.toiletCongestion);
      if (filters.areaFeel) params.append('areaFeel', filters.areaFeel);
      if (filters.cigaretteSmell) params.append('cigaretteSmell', filters.cigaretteSmell);
      if (filters.hasNearbyWater !== undefined) params.append('hasNearbyWater', filters.hasNearbyWater.toString());
      if (filters.stationDistance) params.append('stationDistance', filters.stationDistance);

      const response = await fetch(`/api/stores?${params.toString()}`);
      if (!response.ok) throw new Error('店舗情報の取得に失敗しました');

      let data = await response.json();

      // 距離ソートが有効な場合
      if (sortByDistance && userLocation) {
        data = data
          .map((store: Store) => ({
            ...store,
            distance: store.latitude && store.longitude
              ? calculateDistance(userLocation.lat, userLocation.lng, store.latitude, store.longitude)
              : Infinity
          }))
          .sort((a: Store & { distance: number }, b: Store & { distance: number }) => a.distance - b.distance);
      }

      setStores(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stores,
    loading,
    error,
    fetchStores,
  };
}