'use client';

import { StoreFilters as StoreFiltersType } from '@/lib/types/store';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, X } from 'lucide-react';
import { areaFeelOptions, toiletCongestionOptions, stationDistanceOptions, cigaretteSmellOptions, booleanOptions } from '@/lib/constants/formOptions';

interface StoreFiltersProps {
  filters: StoreFiltersType;
  onFiltersChange: (filters: StoreFiltersType) => void;
  sortByDistance: boolean;
  onSortByDistanceChange: (sortByDistance: boolean) => void;
}

export function StoreFilters({ filters, onFiltersChange, sortByDistance, onSortByDistanceChange }: StoreFiltersProps) {

  const handleFilterChange = (key: keyof StoreFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ''
  );

  return (
    <Card className="mb-6 bg-white/90 backdrop-blur-xl border-white/20">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="キーワード検索"
              placeholder="店舗名や住所で検索"
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <Select
              label="広さ"
              options={areaFeelOptions}
              value={filters.areaFeel || ''}
              onChange={(e) => handleFilterChange('areaFeel', e.target.value)}
            />
            <Select
              label="トイレの混雑度"
              options={toiletCongestionOptions}
              value={filters.toiletCongestion || ''}
              onChange={(e) => handleFilterChange('toiletCongestion', e.target.value)}
            />
            <Select
              label="タバコ臭"
              options={cigaretteSmellOptions}
              value={filters.cigaretteSmell || ''}
              onChange={(e) => handleFilterChange('cigaretteSmell', e.target.value)}
            />
            <Select
              label="駅からの距離"
              options={stationDistanceOptions}
              value={filters.stationDistance || ''}
              onChange={(e) => handleFilterChange('stationDistance', e.target.value)}
            />
            <Select
              label="電源"
              options={booleanOptions}
              value={filters.hasPowerOutlet === undefined ? '' : filters.hasPowerOutlet.toString()}
              onChange={(e) => handleFilterChange('hasPowerOutlet', e.target.value === 'true')}
            />
            <Select
              label="近隣の水分補給スポット"
              options={booleanOptions}
              value={filters.hasNearbyWater === undefined ? '' : filters.hasNearbyWater.toString()}
              onChange={(e) => handleFilterChange('hasNearbyWater', e.target.value === 'true')}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sortByDistance"
                checked={sortByDistance}
                onChange={(e) => onSortByDistanceChange(e.target.checked)}
                className="w-4 h-4 text-green-700 border-gray-300 rounded focus:ring-green-700"
              />
              <label
                htmlFor="sortByDistance"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                現在地から近い順（現在地ボタンを押して有効化）
              </label>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                フィルタをクリア
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
