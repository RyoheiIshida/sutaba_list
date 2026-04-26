'use client';

import { useState, useEffect, useRef } from 'react';
import { Store, StoreFilters as StoreFiltersType } from '@/lib/types/store';
import { StoreCard } from '@/components/stores/StoreCard';
import { StoreFilters } from '@/components/stores/StoreFilters';
import { StoreMap } from '@/components/maps/StoreMap';
import { Button } from '@/components/ui/Button';
import { Plus, Coffee, Map as MapIcon, List, Navigation } from 'lucide-react';
import Link from 'next/link';

type ViewType = 'map' | 'list';

// 距離計算関数（Haversine formula）
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // 地球の半径（km）
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filters, setFilters] = useState<StoreFiltersType>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState<ViewType>('map');
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const mapRef = useRef<any>(null);

  const fetchStores = async () => {
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
      // フィルタ変更時は選択状態をリセット
      setSelectedStore(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('ブラウザが位置情報をサポートしていません');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setSortByDistance(true);
        // 位置情報取得後に店舗を再取得
        fetchStores();
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setError('位置情報の許可が拒否されました');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('位置情報が利用できません');
            break;
          case error.TIMEOUT:
            setError('位置情報の取得がタイムアウトしました');
            break;
          default:
            setError('位置情報の取得中にエラーが発生しました');
        }
      }
    );
  };

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    // マップビューに切り替え
    setViewType('map');
  };

  const handleCardClick = (store: Store) => {
    setSelectedStore(store);
    // マップビューに切り替えて、その店舗にフォーカス
    setViewType('map');
  };

  useEffect(() => {
    fetchStores();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Coffee className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              店舗一覧
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewType('map')}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  viewType === 'map'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MapIcon className="w-4 h-4 mr-2" />
                マップ
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  viewType === 'list'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                リスト
              </button>
            </div>
            <Button
              onClick={handleGetCurrentLocation}
              variant="secondary"
              className="flex items-center"
            >
              <Navigation className="w-4 h-4 mr-2" />
              現在地
            </Button>
            <Link href="/stores/new">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                新規店舗を登録
              </Button>
            </Link>
          </div>
        </div>

        <StoreFilters
          filters={filters}
          onFiltersChange={setFilters}
          sortByDistance={sortByDistance}
          onSortByDistanceChange={setSortByDistance}
        />

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">読み込み中...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!loading && !error && stores.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Coffee className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              店舗が見つかりませんでした
            </p>
          </div>
        )}

        {!loading && !error && stores.length > 0 && viewType === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                isSelected={selectedStore?.id === store.id}
                onClick={() => handleCardClick(store)}
              />
            ))}
          </div>
        )}

        {!loading && !error && stores.length > 0 && viewType === 'map' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <StoreMap
              stores={stores}
              height="600px"
              onStoreClick={handleStoreClick}
            />
          </div>
        )}

        {!loading && !error && stores.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Coffee className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              店舗が見つかりませんでした
            </p>
          </div>
        )}

        {!loading && !error && stores.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            {stores.length}件の店舗が見つかりました
            {viewType === 'map' && selectedStore && ` - ${selectedStore.name}を選択中`}
            {viewType === 'map' && !selectedStore && '（マップ上のピンをクリックで詳細を確認できます）'}
            {viewType === 'list' && '（カードをクリックでマップを表示）'}
          </div>
        )}
      </div>
    </div>
  );
}
