import { DEFAULT_SERVER_URL } from "../constants/urls";

const getFavoritePlaces = async () => {
  const response = await fetch(`${DEFAULT_SERVER_URL}/users/places`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }

  return response;
};

export default getFavoritePlaces;
