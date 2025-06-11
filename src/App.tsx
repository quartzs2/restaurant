import type { Place } from "./types/types";

import getAllPlaces from "./api/getAllPlaces";
import CardContainer from "./components/CardContainer";
import useFetch from "./hooks/useFetch";

function App() {
  const { data, error, isLoading } = useFetch<{ places: Place[] }>({
    query: getAllPlaces,
  });
  const places: Place[] = data?.places ?? [];

  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <CardContainer places={places} />
    </>
  );
}

export default App;
