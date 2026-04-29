'use client';

import { useState, useEffect } from 'react';
import { Store, StoreFilters as StoreFiltersType } from '@/lib/types/store';
import { StoreCard } from '@/components/stores/StoreCard';
import { StoreFilters } from '@/components/stores/StoreFilters';
import { StoreMap } from '@/components/maps/StoreMap';
import { StoresHeader } from '@/components/stores/StoresHeader';
import { StoreListStatus } from '@/components/stores/StoreListStatus';
import { StoreListFooter } from '@/components/stores/StoreListFooter';
import { useStores } from '@/hooks/useStores';
import { useGeolocation } from '@/hooks/useGeolocation';

type ViewType = 'map' | 'list';

export default function StoresPage() {
  const [filters, setFilters] = useState<StoreFiltersType>({});
  const [viewType, setViewType] = useState<ViewType>('map');
  const [sortByDistance, setSortByDistance] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const { stores, loading, error, fetchStores } = useStores();
  const { userLocation, getCurrentLocation, error: geoError } = useGeolocation();

  const handleGetCurrentLocation = async () => {
    const location = await getCurrentLocation();
    if (location) {
      setSortByDistance(true);
      fetchStores(filters, location, true);
    }
  };

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setViewType('map');
  };

  const handleCardClick = (store: Store) => {
    setSelectedStore(store);
    setViewType('map');
  };

  const handleFiltersChange = (newFilters: StoreFiltersType) => {
    setFilters(newFilters);
    setSelectedStore(null);
  };

  useEffect(() => {
    fetchStores(filters, userLocation || undefined, sortByDistance);
  }, [filters, userLocation, sortByDistance]);

  const displayError = error || geoError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-green-950 dark:via-green-900 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-700/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-800/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <StoresHeader
          viewType={viewType}
          onViewTypeChange={setViewType}
          onGetCurrentLocation={handleGetCurrentLocation}
        />

        <StoreFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          sortByDistance={sortByDistance}
          onSortByDistanceChange={setSortByDistance}
        />

        <StoreListStatus
          loading={loading}
          error={displayError}
          storesCount={stores.length}
        />

        {!loading && !displayError && stores.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-300">
              店舗が見つかりませんでした
            </p>
          </div>
        )}

        {!loading && !displayError && stores.length > 0 && viewType === 'list' && (
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

        {!loading && !displayError && stores.length > 0 && viewType === 'map' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <StoreMap
              stores={stores}
              height="600px"
              onStoreClick={handleStoreClick}
            />
          </div>
        )}

        {!loading && !displayError && stores.length > 0 && (
          <StoreListFooter
            storesCount={stores.length}
            viewType={viewType}
            selectedStoreName={selectedStore?.name || null}
          />
        )}
      </div>
    </div>
  );
}