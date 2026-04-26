import Link from 'next/link';
import { Store } from '@/lib/types/store';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Clock, Zap, Droplets, Wind } from 'lucide-react';

interface StoreCardProps {
  store: Store;
  isSelected?: boolean;
  onClick?: () => void;
}

export function StoreCard({ store, isSelected = false, onClick }: StoreCardProps) {
  const areaFeelLabels = {
    large: '広い',
    medium: '普通',
    small: '狭い',
  };

  const toiletCongestionLabels = {
    low: '空いてる',
    medium: '普通',
    high: '混んでる',
  };

  const stationDistanceLabels = {
    near: '近い',
    medium: '普通',
    far: '遠い',
  };

  const cigaretteSmellLabels = {
    none: 'なし',
    light: '軽い',
    medium: '中程度',
    heavy: '強い',
  };

  return (
    <Card
      className={`hover:shadow-lg transition-shadow cursor-pointer ${isSelected ? 'ring-2 ring-green-500' : ''}`}
      onClick={onClick}
    >
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{store.address}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span className="text-sm">{store.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{store.business_hours}</span>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">アクセス:</span> {store.access}
        </div>
        {store.floor && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">階数:</span> {store.floor}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          {store.area_feel && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {areaFeelLabels[store.area_feel]}
            </span>
          )}
          {store.toilet_congestion && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              トイレ: {toiletCongestionLabels[store.toilet_congestion]}
            </span>
          )}
          {store.station_distance && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              駅から{stationDistanceLabels[store.station_distance]}
            </span>
          )}
          {store.cigarette_smell && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              タバコ臭: {cigaretteSmellLabels[store.cigarette_smell]}
            </span>
          )}
          {store.has_power_outlet === 1 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Zap className="w-3 h-3 mr-1" />
              電源あり
            </span>
          )}
          {store.has_nearby_water === 1 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
              <Droplets className="w-3 h-3 mr-1" />
              水分補給あり
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/stores/${store.id}`} className="w-full">
          <Button variant="primary" className="w-full">
            詳細を見る
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
