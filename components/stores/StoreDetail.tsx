import { Store } from '@/lib/types/store';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Clock, Zap, Droplets, Wind, Edit, Trash2, Star, Navigation } from 'lucide-react';
import Link from 'next/link';
import { areaFeelLabels, toiletCongestionLabels, stationDistanceLabels, cigaretteSmellLabels } from '@/lib/constants/storeLabels';

interface StoreDetailProps {
  store: Store;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export function StoreDetail({ store, onDelete, isDeleting = false }: StoreDetailProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-xl border-white/20">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700 rounded-full blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-full">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  {store.name}
                </h1>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 max-w-2xl">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 text-green-600" />
                <span className="text-sm font-medium">{store.address}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href={`/stores/${store.id}/edit`}>
                <Button variant="secondary" size="md" className="shadow-md">
                  <Edit className="w-4 h-4 mr-2" />
                  編集
                </Button>
              </Link>
              {onDelete && (
                <Button
                  variant="danger"
                  size="md"
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="shadow-lg shadow-red-500/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDeleting ? '削除中...' : '削除'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">基本情報</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" />
                    <div>
	                      <p className="text-xs font-semibold text-green-600 mb-1">電話番号</p>
                      <p className="text-gray-900 dark:text-white font-medium">{store.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
	                      <p className="text-xs font-semibold text-blue-600 mb-1">営業時間</p>
                      <p className="text-gray-900 dark:text-white font-medium">{store.business_hours}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                  <p className="text-xs font-semibold text-purple-600 mb-2">アクセス</p>
                  <p className="text-gray-900 dark:text-white font-medium">{store.access}</p>
                </div>
                {store.floor && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                    <p className="text-xs font-semibold text-teal-600 mb-2">階数</p>
                    <p className="text-gray-900 dark:text-white font-medium">{store.floor}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">店舗情報</h3>
              <div className="space-y-3">
                {store.area_feel && (
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">広さ</span>
                      <span className="text-sm font-bold text-blue-800 dark:text-blue-200 bg-white/50 px-3 py-1 rounded-lg">
                        {areaFeelLabels[store.area_feel]}
                      </span>
                    </div>
                  </div>
                )}
                {store.toilet_congestion && (
                  <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">トイレの混雑度</span>
                      <span className="text-sm font-bold text-yellow-800 dark:text-yellow-200 bg-white/50 px-3 py-1 rounded-lg">
                        {toiletCongestionLabels[store.toilet_congestion]}
                      </span>
                    </div>
                  </div>
                )}
                {store.station_distance && (
                  <div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">駅からの距離</span>
                      <span className="text-sm font-bold text-purple-800 dark:text-purple-200 bg-white/50 px-3 py-1 rounded-lg">
                        {stationDistanceLabels[store.station_distance]}
                      </span>
                    </div>
                  </div>
                )}
                {store.cigarette_smell && (
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700/30 dark:to-gray-600/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">タバコ臭</span>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200 bg-white/50 px-3 py-1 rounded-lg">
                        {cigaretteSmellLabels[store.cigarette_smell]}
                      </span>
                    </div>
                  </div>
                )}
                {store.has_power_outlet === 1 && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-green-600" />
                        <span className="text-sm font-semibold text-green-700 dark:text-green-300">電源</span>
                      </div>
                      <span className="text-sm font-bold text-green-800 dark:text-green-200 bg-white/50 px-3 py-1 rounded-lg">
                        あり
                      </span>
                    </div>
                  </div>
                )}
                {store.has_nearby_water === 1 && (
                  <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Droplets className="w-5 h-5 mr-2 text-cyan-600" />
                        <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">水分補給スポット</span>
                      </div>
                      <span className="text-sm font-bold text-cyan-800 dark:text-cyan-200 bg-white/50 px-3 py-1 rounded-lg">
                        あり
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {store.map_image_url && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">店内マップ</h3>
              <div className="relative inline-block">
                <img
                  src={store.map_image_url}
                  alt="店内マップ"
                  className="max-w-2xl h-auto rounded-xl shadow-lg border border-gray-200"
                />
              </div>
            </div>
          )}

          {store.latitude && store.longitude && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-green-600 to-green-700 p-2 rounded-lg">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">位置情報</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white/70 dark:bg-gray-800/50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-green-600 mb-1">緯度</p>
                  <p className="text-gray-900 dark:text-white font-mono">{store.latitude}</p>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-green-600 mb-1">経度</p>
                  <p className="text-gray-900 dark:text-white font-mono">{store.longitude}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold hover:underline"
              >
                Google Mapsで開く →
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      <Link href="/stores">
        <Button variant="secondary" size="lg" className="shadow-lg">
          一覧に戻る
        </Button>
      </Link>
    </div>
  );
}