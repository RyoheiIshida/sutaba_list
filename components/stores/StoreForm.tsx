'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreateStoreInput, Store } from '@/lib/types/store';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Upload, X, MapPin } from 'lucide-react';
import { areaFeelOptions, toiletCongestionOptions, stationDistanceOptions, cigaretteSmellOptions, booleanOptions } from '@/lib/constants/formOptions';

interface StoreFormProps {
  store?: Store;
  onSubmit: (data: CreateStoreInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function StoreForm({ store, onSubmit, isSubmitting = false }: StoreFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateStoreInput>({
    name: '',
    address: '',
    phone: '',
    business_hours: '',
    access: '',
    floor: '',
    area_feel: undefined,
    toilet_congestion: undefined,
    map_image_url: '',
    has_power_outlet: false,
    latitude: undefined,
    longitude: undefined,
    station_distance: undefined,
    cigarette_smell: undefined,
    has_nearby_water: false,
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (store) {
      setFormData({
        name: store.name,
        address: store.address,
        phone: store.phone,
        business_hours: store.business_hours,
        access: store.access,
        floor: store.floor || '',
        area_feel: store.area_feel || undefined,
        toilet_congestion: store.toilet_congestion || undefined,
        map_image_url: store.map_image_url || '',
        has_power_outlet: store.has_power_outlet === 1,
        latitude: store.latitude || undefined,
        longitude: store.longitude || undefined,
        station_distance: store.station_distance || undefined,
        cigarette_smell: store.cigarette_smell || undefined,
        has_nearby_water: store.has_nearby_water === 1,
      });
    }
  }, [store]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await onSubmit(formData);
      router.push('/stores');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'アップロードに失敗しました');
      }

      const data = await response.json();
      setFormData({ ...formData, map_image_url: data.imageUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  };

  const handleMapClick = () => {
    const lat = prompt('緯度を入力してください（例: 34.6989）:');
    if (lat) {
      const lng = prompt('経度を入力してください（例: 135.4954）:');
      if (lng) {
        setFormData({
          ...formData,
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">
          {store ? '店舗情報を編集' : '新規店舗を登録'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="店舗名 *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="電話番号 *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <Input
            label="住所 *"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />

          <Input
            label="営業時間 *"
            value={formData.business_hours}
            onChange={(e) => setFormData({ ...formData, business_hours: e.target.value })}
            required
          />

          <Input
            label="アクセス *"
            value={formData.access}
            onChange={(e) => setFormData({ ...formData, access: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="階数"
              value={formData.floor}
              onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
            />
            <Select
              label="広さ"
              options={areaFeelOptions}
              value={formData.area_feel || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  area_feel: e.target.value as any,
                })
              }
            />
            <Select
              label="トイレの混雑度"
              options={toiletCongestionOptions}
              value={formData.toilet_congestion || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  toilet_congestion: e.target.value as any,
                })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="駅からの距離"
              options={stationDistanceOptions}
              value={formData.station_distance || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  station_distance: e.target.value as any,
                })
              }
            />
            <Select
              label="タバコ臭"
              options={cigaretteSmellOptions}
              value={formData.cigarette_smell || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cigarette_smell: e.target.value as any,
                })
              }
            />
            <Select
              label="電源"
              options={booleanOptions}
              value={formData.has_power_outlet ? 'true' : 'false'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  has_power_outlet: e.target.value === 'true',
                })
              }
            />
          </div>

          <Select
            label="近隣の水分補給スポット"
            options={booleanOptions}
            value={formData.has_nearby_water ? 'true' : 'false'}
            onChange={(e) =>
              setFormData({
                ...formData,
                has_nearby_water: e.target.value === 'true',
              })
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                緯度・経度
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="緯度"
                  value={formData.latitude || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      latitude: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                />
                <Input
                  placeholder="経度"
                  value={formData.longitude || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      longitude: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleMapClick}
                  title="地図から位置を選択"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              店内マップ画像
            </label>
            {formData.map_image_url && (
              <div className="relative inline-block">
                <img
                  src={formData.map_image_url}
                  alt="店内マップ"
                  className="max-w-xs h-auto rounded border"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, map_image_url: '' })}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="mapImage"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              <label
                htmlFor="mapImage"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'アップロード中...' : '画像をアップロード'}
              </label>
              <span className="text-sm text-gray-500">
                JPEG, PNG, WebP（最大5MB）
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || uploading}>
              {isSubmitting ? '保存中...' : store ? '更新' : '登録'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
