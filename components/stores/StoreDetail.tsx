import { Store } from '@/lib/types/store';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Clock, Zap, Droplets, Wind, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface StoreDetailProps {
  store: Store;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export function StoreDetail({ store, onDelete, isDeleting = false }: StoreDetailProps) {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{store.address}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/stores/${store.id}/edit`}>
                <Button variant="secondary" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  編集
                </Button>
              </Link>
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={onDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {isDeleting ? '削除中...' : '削除'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">電話番号</p>
                  <p className="text-gray-600">{store.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">営業時間</p>
                  <p className="text-gray-600">{store.business_hours}</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">アクセス</p>
                <p className="text-gray-600">{store.access}</p>
              </div>
              {store.floor && (
                <div>
                  <p className="font-medium text-gray-900 mb-2">階数</p>
                  <p className="text-gray-600">{store.floor}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">店舗情報</h3>
              <div className="space-y-3">
                {store.area_feel && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-900">広さ</span>
                    <span className="text-sm text-blue-700">{areaFeelLabels[store.area_feel]}</span>
                  </div>
                )}
                {store.toilet_congestion && (
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-yellow-900">トイレの混雑度</span>
                    <span className="text-sm text-yellow-700">{toiletCongestionLabels[store.toilet_congestion]}</span>
                  </div>
                )}
                {store.station_distance && (
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-900">駅からの距離</span>
                    <span className="text-sm text-purple-700">{stationDistanceLabels[store.station_distance]}</span>
                  </div>
                )}
                {store.cigarette_smell && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">タバコ臭</span>
                    <span className="text-sm text-gray-700">{cigaretteSmellLabels[store.cigarette_smell]}</span>
                  </div>
                )}
                {store.has_power_outlet === 1 && (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium text-green-900">電源</span>
                    </div>
                    <span className="text-sm text-green-700">あり</span>
                  </div>
                )}
                {store.has_nearby_water === 1 && (
                  <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                    <div className="flex items-center">
                      <Droplets className="w-4 h-4 mr-2 text-cyan-600" />
                      <span className="text-sm font-medium text-cyan-900">水分補給スポット</span>
                    </div>
                    <span className="text-sm text-cyan-700">あり</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {store.map_image_url && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">店内マップ</h3>
              <img
                src={store.map_image_url}
                alt="店内マップ"
                className="max-w-2xl h-auto rounded-lg border border-gray-200"
              />
            </div>
          )}

          {store.latitude && store.longitude && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">位置情報</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">緯度</p>
                  <p className="text-sm text-gray-600">{store.latitude}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">経度</p>
                  <p className="text-sm text-gray-600">{store.longitude}</p>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Google Mapsで開く →
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Link href="/stores">
        <Button variant="secondary">一覧に戻る</Button>
      </Link>
    </div>
  );
}
