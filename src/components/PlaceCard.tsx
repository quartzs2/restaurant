import type { Place } from "../types/types";

import { DEFAULT_SERVER_URL } from "../constants/urls";

const PlaceCard = ({ image, title }: Place) => {
  return (
    <div
      className="= aspect-video w-[400px] rounded-2xl bg-cover"
      style={{
        backgroundImage: `url(${DEFAULT_SERVER_URL}/${image.src})`,
      }}
    >
      <span className="rounded-2xl bg-amber-950 p-2 text-amber-100">
        {title}
      </span>
    </div>
  );
};

export default PlaceCard;
