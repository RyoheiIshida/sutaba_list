import { z } from 'zod';

export const createStoreSchema = z.object({
  name: z.string().min(1, '店舗名は必須です'),
  address: z.string().min(1, '住所は必須です'),
  phone: z.string().min(1, '電話番号は必須です').regex(/^[\d\-\s()（）+]+$/, '電話番号の形式が正しくありません（半角数字とハイフン、スペースのみ）'),
  business_hours: z.string().min(1, '営業時間は必須です'),
  access: z.string().optional(),
  train_lines: z.array(z.string().min(1, '路線は空欄にできません')).optional(),
  stations: z.array(z.string().min(1, '駅は空欄にできません')).optional(),
  floor: z.string().optional(),
  area_feel: z.enum(['large', 'medium', 'small']).optional(),
  toilet_congestion: z.enum(['low', 'medium', 'high']).optional(),
  map_image_url: z.string().url('画像URLの形式が正しくありません').optional().or(z.literal('')),
  has_power_outlet: z.boolean().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  station_distance: z.enum(['near', 'medium', 'far']).optional(),
  cigarette_smell: z.enum(['none', 'light', 'medium', 'heavy']).optional(),
  has_nearby_water: z.boolean().optional(),
});

export const updateStoreSchema = createStoreSchema.partial();

export const storeFiltersSchema = z.object({
  search: z.string().optional(),
  hasPowerOutlet: z.boolean().optional(),
  toiletCongestion: z.enum(['low', 'medium', 'high']).optional(),
  areaFeel: z.enum(['large', 'medium', 'small']).optional(),
  cigaretteSmell: z.enum(['none', 'light', 'medium', 'heavy']).optional(),
  hasNearbyWater: z.boolean().optional(),
  stationDistance: z.enum(['near', 'medium', 'far']).optional(),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
export type StoreFilters = z.infer<typeof storeFiltersSchema>;
