import type { Place } from "../types/types";

import { sortPlacesByDistance } from "../utils/location";
import CardContainer from "./CardContainer";

interface SectionProps {
  data: null | { places: Place[] };
  error: Error | null;
  isLoading: boolean;
  location?: { latitude: number; longitude: number };
  onPlaceCardClick?: (place: Place) => void;
  title: string;
}

const Section = ({
  data,
  error,
  isLoading,
  location,
  onPlaceCardClick,
  title,
}: SectionProps) => {
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

  return (
    <section className="flex flex-col items-center">
      <div>{title}</div>
      {sortedPlaces.length ? (
        <CardContainer
          error={error}
          isLoading={isLoading}
          onPlaceCardClick={onPlaceCardClick}
          places={sortedPlaces}
        />
      ) : (
        <div>데이터가 없습니다</div>
      )}
    </section>
  );
};
export default Section;
