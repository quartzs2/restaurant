import { useMemo } from "react";

import deleteFavoritePlace from "./api/deleteFavoritePlace";
import getAllPlaces from "./api/getAllPlaces";
import getFavoritePlaces from "./api/getFavoritePlaces";
import postFavoritePlace from "./api/postFavoritePlace";
import Section from "./components/Section";
import { useGeoLocation } from "./hooks/useGeoLocation";

function App() {
  const memoizedOptions = useMemo(() => ({}), []);
  const { error: geolocationError, location } = useGeoLocation(memoizedOptions);

  return (
    <>
      {geolocationError && <div>{(geolocationError as Error).message}</div>}
      <Section
        fetchFunction={getFavoritePlaces}
        location={location}
        onPlaceCardClick={(place) => deleteFavoritePlace({ id: place.id })}
        title="찜한 맛집"
      />
      <Section
        fetchFunction={getAllPlaces}
        location={location}
        onPlaceCardClick={(place) => postFavoritePlace({ placeData: place })}
        title="전체 맛집"
      />
    </>
  );
}

export default App;
