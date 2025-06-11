import { DEFAULT_SERVER_URL } from "../constants/urls";

const getAllPlaces = async () => {
  const response = await fetch(`${DEFAULT_SERVER_URL}/places`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }

  return response;
};

export default getAllPlaces;
