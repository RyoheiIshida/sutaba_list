export interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  business_hours: string;
  access?: string | null;
  train_lines?: string | null;
  stations?: string | null;
  floor?: string | null;
  area_feel?: 'large' | 'medium' | 'small' | null;
  toilet_congestion?: 'low' | 'medium' | 'high' | null;
  map_image_url?: string | null;
  has_power_outlet: number;
  latitude?: number | null;
  longitude?: number | null;
  station_distance?: 'near' | 'medium' | 'far' | null;
  cigarette_smell?: 'none' | 'light' | 'medium' | 'heavy' | 'to_way' | null;
  has_nearby_water: number;
  created_at: string;
  updated_at: string;
}

export interface CreateStoreInput {
  name: string;
  address: string;
  phone: string;
  business_hours: string;
  access?: string;
  train_lines?: string[];
  stations?: string[];
  floor?: string;
  area_feel?: 'large' | 'medium' | 'small';
  toilet_congestion?: 'low' | 'medium' | 'high';
  map_image_url?: string;
  has_power_outlet?: boolean;
  latitude?: number;
  longitude?: number;
  station_distance?: 'near' | 'medium' | 'far';
  cigarette_smell?: 'none' | 'light' | 'medium' | 'heavy' | 'to_way';
  has_nearby_water?: boolean;
}

export interface UpdateStoreInput extends Partial<CreateStoreInput> {}

export interface StoreFilters {
  search?: string;
  hasPowerOutlet?: boolean;
  toiletCongestion?: 'low' | 'medium' | 'high';
  areaFeel?: 'large' | 'medium' | 'small';
  cigaretteSmell?: 'none' | 'light' | 'medium' | 'heavy' | 'to_way';
  hasNearbyWater?: boolean;
  stationDistance?: 'near' | 'medium' | 'far';
}
