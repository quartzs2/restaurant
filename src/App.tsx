import { useMemo } from "react";

import type { Place } from "./types/types";

import deleteFavoritePlace from "./api/deleteFavoritePlace";
import getAllPlaces from "./api/getAllPlaces";
import getFavoritePlaces from "./api/getFavoritePlaces";
import postFavoritePlace from "./api/postFavoritePlace";
import Section from "./components/Section";
import useFetch from "./hooks/useFetch";
import { useGeoLocation } from "./hooks/useGeoLocation";

function App() {
  const memoizedOptions = useMemo(() => ({}), []);
  const { error: geolocationError, location } = useGeoLocation(memoizedOptions);

  const {
    data: favoritePlacesData,
    error: favoritePlacesError,
    isLoading: favoritePlacesIsLoading,
    refetch: refetchFavoritePlaces,
  } = useFetch<{ places: Place[] }>({
    query: getFavoritePlaces,
  });

  const {
    data: allPlacesData,
    error: allPlacesError,
    isLoading: allPlacesIsLoading,
    refetch: refetchAllPlaces,
  } = useFetch<{ places: Place[] }>({
    query: getAllPlaces,
  });

  return (
    <>
      {geolocationError && <div>{(geolocationError as Error).message}</div>}
      <Section
        data={favoritePlacesData}
        error={favoritePlacesError}
        isLoading={favoritePlacesIsLoading}
        location={location}
        onPlaceCardClick={async (place) => {
          await deleteFavoritePlace({ id: place.id });
          refetchFavoritePlaces();
        }}
        title="찜한 맛집"
      />
      <Section
        data={allPlacesData}
        error={allPlacesError}
        isLoading={allPlacesIsLoading}
        location={location}
        onPlaceCardClick={async (place) => {
          await postFavoritePlace({ placeData: place });
          refetchFavoritePlaces();
          refetchAllPlaces();
        }}
        title="전체 맛집"
      />
    </>
  );
}

export default App;
