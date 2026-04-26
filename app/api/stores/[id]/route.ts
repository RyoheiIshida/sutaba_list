import { NextRequest, NextResponse } from 'next/server';
import { initDb } from '@/lib/db/sqlite';
import { StoreRepository } from '@/lib/db/store-repository';
import { updateStoreSchema } from '@/lib/utils/validation';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = initDb();
    const repo = new StoreRepository();

    const store = repo.findById(parseInt(id));

    if (!store) {
      return NextResponse.json(
        { error: '店舗が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json(
      { error: '店舗情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = initDb();
    const repo = new StoreRepository();

    const body = await request.json();

    const validatedData = updateStoreSchema.parse(body);

    const updatedStore = repo.update(parseInt(id), {
      name: validatedData.name,
      address: validatedData.address,
      phone: validatedData.phone,
      business_hours: validatedData.business_hours,
      access: validatedData.access,
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

    if (!updatedStore) {
      return NextResponse.json(
        { error: '店舗が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedStore);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    console.error('Error updating store:', error);
    return NextResponse.json(
      { error: '店舗の更新に失敗しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = initDb();
    const repo = new StoreRepository();

    const deleted = repo.delete(parseInt(id));

    if (!deleted) {
      return NextResponse.json(
        { error: '店舗が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting store:', error);
    return NextResponse.json(
      { error: '店舗の削除に失敗しました' },
      { status: 500 }
    );
  }
}
