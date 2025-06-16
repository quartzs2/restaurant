import { useEffect, useState } from "react";

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = (options: GeolocationOptions) => {
  const [location, setLocation] = useState<Location>();
  const [error, setError] = useState<Error | null>(null);

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(new Error(err.message));
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError(new Error("위치를 불러오지 못했습니다."));
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { error, location };
};
