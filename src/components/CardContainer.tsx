import type { Place } from "../types/types";

import PlaceCard from "./PlaceCard";

const CardContainer = ({
  error,
  isLoading,
  onPlaceCardClick,
  places,
}: {
  error: Error | null;
  isLoading: boolean;
  onPlaceCardClick?: (place: Place) => void;
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
        <PlaceCard key={place.id} {...place} clickFunction={onPlaceCardClick} />
      ))}
    </section>
  );
};
export default CardContainer;
