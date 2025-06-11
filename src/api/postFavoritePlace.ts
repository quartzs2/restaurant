import type { Place } from "../types/types";

import { DEFAULT_SERVER_URL } from "../constants/urls";

const postFavoritePlace = async ({ placeData }: { placeData: Place }) => {
  const response = await fetch(`${DEFAULT_SERVER_URL}/users/places`, {
    body: JSON.stringify(placeData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }

  return response;
};

export default postFavoritePlace;
