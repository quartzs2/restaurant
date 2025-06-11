import type { Place } from "../types/types";

import PlaceCard from "./PlaceCard";

const CardContainer = ({ places }: { places: Place[] }) => {
  return (
    <section className="flex flex-wrap gap-4">
      {places.map((place) => (
        <PlaceCard key={place.id} {...place} />
      ))}
    </section>
  );
};
export default CardContainer;
