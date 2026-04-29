import { Button } from '@/components/ui/Button';
import { Coffee, Map as MapIcon, List, Navigation, Plus } from 'lucide-react';
import Link from 'next/link';

interface StoresHeaderProps {
  viewType: 'map' | 'list';
  onViewTypeChange: (type: 'map' | 'list') => void;
  onGetCurrentLocation: () => void;
}

export function StoresHeader({ viewType, onViewTypeChange, onGetCurrentLocation }: StoresHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 p-6 mb-8 border border-white/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700 rounded-xl blur-lg opacity-75"></div>
            <div className="relative bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-xl">
              <Coffee className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              店舗一覧
            </h1>
            <p className="text-sm text-gray-500 mt-1">お近くのスターバックスを見つけよう</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex bg-gray-100 rounded-2xl p-1.5 shadow-sm">
            <button
              onClick={() => onViewTypeChange('map')}
              className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                viewType === 'map'
                  ? 'bg-white text-green-600 shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MapIcon className="w-4 h-4 mr-2" />
              <span className="font-medium">マップ</span>
            </button>
            <button
              onClick={() => onViewTypeChange('list')}
              className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                viewType === 'list'
                  ? 'bg-white text-green-600 shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              <span className="font-medium">リスト</span>
            </button>
          </div>

          <Button
            onClick={onGetCurrentLocation}
            variant="secondary"
            size="md"
            className="shadow-md hover:shadow-lg"
          >
            <Navigation className="w-4 h-4 mr-2" />
            現在地
          </Button>

          <Link href="/stores/new">
            <Button variant="primary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              新規店舗を登録
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}