import { DEFAULT_SERVER_URL } from "../constants/urls";

const deleteFavoritePlace = async ({ id }: { id: string }) => {
  const response = await fetch(`${DEFAULT_SERVER_URL}/users/places/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }

  return response;
};

export default deleteFavoritePlace;
