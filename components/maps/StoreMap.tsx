'use client';

import { useEffect, useRef, useState } from 'react';
import { Store } from '@/lib/types/store';

declare global {
  var google: any;
  var initMap: () => void;
}

interface StoreMapProps {
  stores: Store[];
  onStoreClick?: (store: Store) => void;
  onLocationSelect?: (lat: number, lng: number) => void;
  selectable?: boolean;
  height?: string;
}

export function StoreMap({
  stores,
  onStoreClick,
  onLocationSelect,
  selectable = false,
  height = '400px',
}: StoreMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapRefInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initMapFunction, setInitMapFunction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps APIキーが設定されていません');
      return;
    }

    // 既にGoogle Mapsが読み込まれているかチェック
    if ((window as any).google && (window as any).google.maps) {
      setIsLoaded(true);
      if (mapRef.current && !mapRefInstance.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 35.6762, lng: 139.6503 },
          zoom: 5,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        mapRefInstance.current = map;

        if (selectable) {
          map.addListener('click', (e: any) => {
            if (e.latLng && onLocationSelect) {
              onLocationSelect(e.latLng.lat(), e.latLng.lng());
            }
          });
        }
      }
      return;
    }

    // 既にスクリプトが存在するかチェック
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      // スクリプトが存在するがGoogleがまだ読み込まれてない場合、ポーリングで待つ
      const checkGoogleLoaded = setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
          clearInterval(checkGoogleLoaded);
          setIsLoaded(true);
          if (mapRef.current && !mapRefInstance.current) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat: 35.6762, lng: 139.6503 },
              zoom: 5,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            });

            mapRefInstance.current = map;

            if (selectable) {
              map.addListener('click', (e: any) => {
                if (e.latLng && onLocationSelect) {
                  onLocationSelect(e.latLng.lat(), e.latLng.lng());
                }
              });
            }
          }
        }
      }, 100);

      // 10秒後にタイムアウト
      setTimeout(() => {
        clearInterval(checkGoogleLoaded);
        if (!isLoaded) {
          setError('Google Mapsの読み込みがタイムアウトしました');
        }
      }, 10000);

      return;
    }

    // スクリプトを読み込む
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // スクリプトが読み込まれたら、Googleオブジェクトが利用可能になるのを待つ
      const checkGoogleLoaded = setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
          clearInterval(checkGoogleLoaded);
          setIsLoaded(true);
          if (mapRef.current && !mapRefInstance.current) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat: 35.6762, lng: 139.6503 },
              zoom: 5,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            });

            mapRefInstance.current = map;

            if (selectable) {
              map.addListener('click', (e: any) => {
                if (e.latLng && onLocationSelect) {
                  onLocationSelect(e.latLng.lat(), e.latLng.lng());
                }
              });
            }
          }
        }
      }, 100);

      // 10秒後にタイムアウト
      setTimeout(() => {
        clearInterval(checkGoogleLoaded);
        if (!isLoaded) {
          setError('Google Mapsの読み込みがタイムアウトしました');
        }
      }, 10000);
    };

    script.onerror = () => {
      setError('Google Mapsの読み込みに失敗しました');
    };

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    document.head.appendChild(script);

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [selectable, onLocationSelect, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !mapRefInstance.current) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const map = mapRefInstance.current;

    const validStores = stores.filter((store) => store.latitude && store.longitude);

    if (validStores.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      validStores.forEach((store) => {
        if (!store.latitude || !store.longitude) return;

        const position = { lat: store.latitude, lng: store.longitude };

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold text-lg">${store.name}</h3>
              <p class="text-sm text-gray-600">${store.address}</p>
              ${store.station_distance ? `<p class="text-sm mt-1">駅からの距離: ${store.station_distance === 'near' ? '近い' : store.station_distance === 'medium' ? '普通' : '遠い'}</p>` : ''}
              ${store.cigarette_smell ? `<p class="text-sm">タバコ臭: ${store.cigarette_smell === 'none' ? 'なし' : store.cigarette_smell === 'light' ? '軽い' : store.cigarette_smell === 'medium' ? '中程度' : '強い'}</p>` : ''}
              ${store.has_nearby_water === 1 ? '<p class="text-sm text-green-600">✓ 水分補給スポットあり</p>' : ''}
            </div>
          `,
        });

        const marker = new window.google.maps.Marker({
          position,
          map,
          title: store.name,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          if (onStoreClick) {
            onStoreClick(store);
          }
        });

        markersRef.current.push(marker);
        bounds.extend(position);
      });

      map.fitBounds(bounds);

      if (validStores.length === 1) {
        map.setZoom(15);
      } else {
        const listener = window.google.maps.event.addListener(map, 'bounds_changed', () => {
          if (map.getZoom() && map.getZoom() > 15) {
            map.setZoom(15);
          }
          window.google.maps.event.removeListener(listener);
        });
      }
    }
  }, [stores, isLoaded, onStoreClick]);

  if (error) {
    return (
      <div
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600">マップを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="rounded-lg overflow-hidden shadow-lg"
      style={{ height }}
    />
  );
}
