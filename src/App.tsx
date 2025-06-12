import type { Place } from "./types/types";

import getAllPlaces from "./api/getAllPlaces";
import CardContainer from "./components/CardContainer";
import useFetch from "./hooks/useFetch";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { sortPlacesByDistance } from "./utils/location";

function App() {
  const {
    data,
    error: fetchError,
    isLoading,
  } = useFetch<{ places: Place[] }>({
    query: getAllPlaces,
  });
  const { error: geolocationError, location } = useGeoLocation();

  const places: Place[] = data?.places ?? [];

  let sortedPlaces: Place[];
  if (location && places.length > 0) {
    sortedPlaces = sortPlacesByDistance(
      places,
      location.latitude,
      location.longitude,
    );
  } else {
    sortedPlaces = places;
  }

  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }

  if (fetchError || geolocationError) {
    return <div>{(fetchError || geolocationError)?.message}</div>;
  }

  return (
    <>
      <CardContainer places={sortedPlaces} />
    </>
  );
}

export default App;
