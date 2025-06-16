import type { Place } from "../types/types";

import PlaceCard from "./PlaceCard";

const CardContainer = ({
  error,
  isLoading,
  places,
}: {
  error: Error | null;
  isLoading: boolean;
  places: Place[];
}) => {
  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="flex max-w-fit flex-wrap gap-4">
      {places.map((place) => (
        <PlaceCard key={place.id} {...place} />
      ))}
    </section>
  );
};
export default CardContainer;
