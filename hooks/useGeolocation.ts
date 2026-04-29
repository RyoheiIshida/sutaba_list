import { useState, useCallback } from 'react';

interface GeolocationState {
  userLocation: { lat: number; lng: number } | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    userLocation: null,
    error: null,
    loading: false,
  });

  const getCurrentLocation = useCallback((): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setState(prev => ({ ...prev, error: 'ブラウザが位置情報をサポートしていません' }));
        resolve(null);
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setState(prev => ({ ...prev, userLocation: location, loading: false, error: null }));
          resolve(location);
        },
        (error) => {
          let errorMessage = '位置情報の取得中にエラーが発生しました';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = '位置情報の許可が拒否されました';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = '位置情報が利用できません';
              break;
            case error.TIMEOUT:
              errorMessage = '位置情報の取得がタイムアウトしました';
              break;
          }
          setState(prev => ({ ...prev, error: errorMessage, loading: false }));
          resolve(null);
        }
      );
    });
  }, []);

  return {
    ...state,
    getCurrentLocation,
  };
}