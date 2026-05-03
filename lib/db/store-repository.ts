import { getDb } from './sqlite';

export interface Store {
  id?: number;
  name: string;
  address: string;
  phone: string;
  business_hours: string;
  access?: string;
  train_lines?: string;
  stations?: string;
  floor?: string;
  area_feel?: 'large' | 'medium' | 'small';
  toilet_congestion?: 'low' | 'medium' | 'high';
  map_image_url?: string;
  has_power_outlet?: number;
  latitude?: number;
  longitude?: number;
  station_distance?: 'near' | 'medium' | 'far';
  cigarette_smell?: 'none' | 'light' | 'medium' | 'heavy';
  has_nearby_water?: number;
  created_at?: string;
  updated_at?: string;
}

export interface StoreFilters {
  search?: string;
  hasPowerOutlet?: boolean;
  toiletCongestion?: 'low' | 'medium' | 'high';
  areaFeel?: 'large' | 'medium' | 'small';
  cigaretteSmell?: 'none' | 'light' | 'medium' | 'heavy';
  hasNearbyWater?: boolean;
  stationDistance?: 'near' | 'medium' | 'far';
}

export class StoreRepository {
  private db = getDb();

  findAll(filters?: StoreFilters): Store[] {
    let query = 'SELECT * FROM stores WHERE 1=1';
    const params: any[] = [];

    if (filters?.search) {
      query += ' AND (name LIKE ? OR address LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters?.hasPowerOutlet !== undefined) {
      query += ' AND has_power_outlet = ?';
      params.push(filters.hasPowerOutlet ? 1 : 0);
    }

    if (filters?.toiletCongestion) {
      query += ' AND toilet_congestion = ?';
      params.push(filters.toiletCongestion);
    }

    if (filters?.areaFeel) {
      query += ' AND area_feel = ?';
      params.push(filters.areaFeel);
    }

    if (filters?.cigaretteSmell) {
      query += ' AND cigarette_smell = ?';
      params.push(filters.cigaretteSmell);
    }

    if (filters?.hasNearbyWater !== undefined) {
      query += ' AND has_nearby_water = ?';
      params.push(filters.hasNearbyWater ? 1 : 0);
    }

    if (filters?.stationDistance) {
      query += ' AND station_distance = ?';
      params.push(filters.stationDistance);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = this.db.prepare(query);
    return stmt.all(...params) as Store[];
  }

  findById(id: number): Store | undefined {
    const stmt = this.db.prepare('SELECT * FROM stores WHERE id = ?');
    return stmt.get(id) as Store | undefined;
  }

  create(store: Omit<Store, 'id' | 'created_at' | 'updated_at'>): Store {
    const stmt = this.db.prepare(`
      INSERT INTO stores (
        name, address, phone, business_hours, access, train_lines, stations, floor, area_feel,
        toilet_congestion, map_image_url, has_power_outlet, latitude, longitude,
        station_distance, cigarette_smell, has_nearby_water
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      store.name,
      store.address,
      store.phone,
      store.business_hours,
      store.access || null,
      store.train_lines || null,
      store.stations || null,
      store.floor || null,
      store.area_feel || null,
      store.toilet_congestion || null,
      store.map_image_url || null,
      store.has_power_outlet ? 1 : 0,
      store.latitude || null,
      store.longitude || null,
      store.station_distance || null,
      store.cigarette_smell || null,
      store.has_nearby_water ? 1 : 0
    );

    return this.findById(result.lastInsertRowid as number)!;
  }

  update(id: number, store: Partial<Omit<Store, 'id' | 'created_at' | 'updated_at'>>): Store | undefined {
    const fields: string[] = [];
    const params: any[] = [];

    Object.entries(store).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'has_power_outlet' || key === 'has_nearby_water') {
          fields.push(`${key} = ?`);
          params.push(value ? 1 : 0);
        } else if (key === 'train_lines' || key === 'stations') {
          fields.push(`${key} = ?`);
          params.push(Array.isArray(value) ? JSON.stringify(value) : value);
        } else {
          fields.push(`${key} = ?`);
          params.push(value);
        }
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);

    const stmt = this.db.prepare(`
      UPDATE stores SET ${fields.join(', ')} WHERE id = ?
    `);

    stmt.run(...params);
    return this.findById(id);
  }

  delete(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM stores WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
