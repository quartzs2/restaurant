import { DEFAULT_SERVER_URL } from "../constants/urls";
import HttpError from "../errors/HttpError";

const getFavoritePlaces = async () => {
  const response = await fetch(`${DEFAULT_SERVER_URL}/users/places`);

  if (!response.ok) {
    let errorMessage = `Http Error! status: ${response.status}`;

    const errorData = await response.json().catch(() => null);

    if (errorData && errorData.message) {
      errorMessage = errorData.message;
    }

    throw new HttpError(errorMessage, response.status);
  }

  return response;
};

export default getFavoritePlaces;
