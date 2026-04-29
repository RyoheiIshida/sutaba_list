import Link from 'next/link';
import { Store } from '@/lib/types/store';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Clock, Zap, Droplets, Wind, Star } from 'lucide-react';
import { areaFeelLabels, toiletCongestionLabels, stationDistanceLabels, cigaretteSmellLabels } from '@/lib/constants/storeLabels';

interface StoreCardProps {
  store: Store;
  isSelected?: boolean;
  onClick?: () => void;
}

export function StoreCard({ store, isSelected = false, onClick }: StoreCardProps) {
  return (
    <Card
      className={`hover:shadow-2xl hover:shadow-green-600/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${isSelected ? 'ring-2 ring-green-600 ring-offset-2 shadow-xl shadow-green-600/20' : ''}`}
      hoverEffect={true}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{store.name}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="line-clamp-2">{store.address}</span>
            </div>
          </div>
          {isSelected && (
            <div className="bg-green-100 text-green-600 rounded-full p-1">
              <Star className="w-5 h-5 fill-current" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <Phone className="w-4 h-4 mr-3 flex-shrink-0 text-green-600" />
            <span className="text-sm font-medium">{store.phone}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <Clock className="w-4 h-4 mr-3 flex-shrink-0 text-green-600" />
            <span className="text-sm font-medium">{store.business_hours}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-3">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">アクセス</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{store.access}</p>
        </div>

        {store.floor && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-3">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">階数</p>
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">{store.floor}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {store.area_feel && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 dark:from-blue-900 dark:to-blue-800 dark:text-blue-200">
              {areaFeelLabels[store.area_feel]}
            </span>
          )}
          {store.toilet_congestion && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 dark:from-yellow-900 dark:to-yellow-800 dark:text-yellow-200">
              トイレ: {toiletCongestionLabels[store.toilet_congestion]}
            </span>
          )}
          {store.station_distance && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 dark:from-purple-900 dark:to-purple-800 dark:text-purple-200">
              駅から{stationDistanceLabels[store.station_distance]}
            </span>
          )}
          {store.cigarette_smell && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200">
              タバコ臭: {cigaretteSmellLabels[store.cigarette_smell]}
            </span>
          )}
          {store.has_power_outlet === 1 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-50 to-green-100 text-green-800 dark:from-green-900 dark:to-green-800 dark:text-green-200">
              <Zap className="w-3 h-3 mr-1" />
              電源あり
            </span>
          )}
          {store.has_nearby_water === 1 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-800 dark:from-cyan-900 dark:to-cyan-800 dark:text-cyan-200">
              <Droplets className="w-3 h-3 mr-1" />
              水分補給あり
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/stores/${store.id}`} className="w-full">
          <Button variant="primary" className="w-full shadow-lg">
            詳細を見る
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}