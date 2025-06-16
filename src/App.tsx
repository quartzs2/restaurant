import { useMemo } from "react";

import getAllPlaces from "./api/getAllPlaces";
import getFavoritePlaces from "./api/getFavoritePlaces";
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
        title="찜한 맛집"
      />
      <Section
        fetchFunction={getAllPlaces}
        location={location}
        title="전체 맛집"
      />
    </>
  );
}

export default App;
