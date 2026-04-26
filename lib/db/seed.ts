import { initDb } from './sqlite';
import { StoreRepository } from './store-repository';

const sampleStores = [
  {
    name: 'スターバックス コーヒー 大阪梅田店',
    address: '大阪府大阪市北区梅田3-1-1',
    phone: '06-6344-1234',
    business_hours: '7:00-22:00',
    access: '大阪梅田駅から徒歩5分',
    floor: '2階',
    area_feel: 'large' as const,
    toilet_congestion: 'medium' as const,
    map_image_url: undefined,
    has_power_outlet: 1,
    latitude: 34.6989,
    longitude: 135.4954,
    station_distance: 'near' as const,
    cigarette_smell: 'light' as const,
    has_nearby_water: 1,
  },
  {
    name: 'スターバックス コーヒー 心斎橋店',
    address: '大阪府大阪市中央区心斎橋筋1-1-1',
    phone: '06-6211-5678',
    business_hours: '7:30-21:30',
    access: '心斎橋駅から徒歩3分',
    floor: '1階',
    area_feel: 'small' as const,
    toilet_congestion: 'high' as const,
    map_image_url: undefined,
    has_power_outlet: 0,
    latitude: 34.6690,
    longitude: 135.5006,
    station_distance: 'near' as const,
    cigarette_smell: 'none' as const,
    has_nearby_water: 0,
  },
  {
    name: 'スターバックス コーヒー 難波公園店',
    address: '大阪府大阪市南区難波5-1-1',
    phone: '06-6644-9012',
    business_hours: '8:00-22:00',
    access: '難波駅から徒歩7分',
    floor: '3階',
    area_feel: 'large' as const,
    toilet_congestion: 'low' as const,
    map_image_url: undefined,
    has_power_outlet: 1,
    latitude: 34.6675,
    longitude: 135.5012,
    station_distance: 'medium' as const,
    cigarette_smell: 'medium' as const,
    has_nearby_water: 1,
  },
  {
    name: 'スターバックス コーヒー 天神店',
    address: '福岡県福岡市中央区天神1-1-1',
    phone: '092-711-3456',
    business_hours: '7:00-21:00',
    access: '天神駅から徒歩4分',
    floor: '1階',
    area_feel: 'medium' as const,
    toilet_congestion: 'medium' as const,
    map_image_url: undefined,
    has_power_outlet: 1,
    latitude: 33.5905,
    longitude: 130.4017,
    station_distance: 'near' as const,
    cigarette_smell: 'light' as const,
    has_nearby_water: 1,
  },
  {
    name: 'スターバックス コーヒー 博多駅店',
    address: '福岡県福岡市博多区博多駅1-1-1',
    phone: '092-431-7890',
    business_hours: '6:30-23:00',
    access: '博多駅から徒歩2分',
    floor: '2階',
    area_feel: 'large' as const,
    toilet_congestion: 'high' as const,
    map_image_url: undefined,
    has_power_outlet: 0,
    latitude: 33.5869,
    longitude: 130.4204,
    station_distance: 'near' as const,
    cigarette_smell: 'heavy' as const,
    has_nearby_water: 0,
  },
];

export function seedDatabase() {
  const db = initDb();
  const repo = new StoreRepository();

  const existingStores = repo.findAll();
  if (existingStores.length > 0) {
    console.log('データベースには既にデータが存在します');
    return;
  }

  sampleStores.forEach((store) => {
    repo.create(store);
  });

  console.log(`${sampleStores.length}件のサンプルデータを挿入しました`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}
