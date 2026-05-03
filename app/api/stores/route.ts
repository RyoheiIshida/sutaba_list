import { NextRequest, NextResponse } from 'next/server';
import { initDb } from '@/lib/db/sqlite';
import { StoreRepository, StoreFilters } from '@/lib/db/store-repository';
import { createStoreSchema, storeFiltersSchema } from '@/lib/utils/validation';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = initDb();
    const repo = new StoreRepository();

    const searchParams = request.nextUrl.searchParams;
    const filters: StoreFilters = {};

    if (searchParams.get('search')) {
      filters.search = searchParams.get('search')!;
    }
    if (searchParams.get('hasPowerOutlet')) {
      filters.hasPowerOutlet = searchParams.get('hasPowerOutlet') === 'true';
    }
    if (searchParams.get('toiletCongestion')) {
      filters.toiletCongestion = searchParams.get('toiletCongestion') as any;
    }
    if (searchParams.get('areaFeel')) {
      filters.areaFeel = searchParams.get('areaFeel') as any;
    }
    if (searchParams.get('cigaretteSmell')) {
      filters.cigaretteSmell = searchParams.get('cigaretteSmell') as any;
    }
    if (searchParams.get('hasNearbyWater')) {
      filters.hasNearbyWater = searchParams.get('hasNearbyWater') === 'true';
    }
    if (searchParams.get('stationDistance')) {
      filters.stationDistance = searchParams.get('stationDistance') as any;
    }

    const stores = repo.findAll(filters);
    return NextResponse.json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json(
      { error: '店舗情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = initDb();
    const repo = new StoreRepository();

    const body = await request.json();

    const validatedData = createStoreSchema.parse(body);

    const newStore = repo.create({
      name: validatedData.name,
      address: validatedData.address,
      phone: validatedData.phone,
      business_hours: validatedData.business_hours,
      access: validatedData.access,
      train_lines: validatedData.train_lines ? JSON.stringify(validatedData.train_lines) : undefined,
      stations: validatedData.stations ? JSON.stringify(validatedData.stations) : undefined,
      floor: validatedData.floor,
      area_feel: validatedData.area_feel,
      toilet_congestion: validatedData.toilet_congestion,
      map_image_url: validatedData.map_image_url || undefined,
      has_power_outlet: validatedData.has_power_outlet ? 1 : 0,
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      station_distance: validatedData.station_distance,
      cigarette_smell: validatedData.cigarette_smell,
      has_nearby_water: validatedData.has_nearby_water ? 1 : 0,
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    console.error('Error creating store:', error);
    return NextResponse.json(
      { error: '店舗の作成に失敗しました' },
      { status: 500 }
    );
  }
}
