import { useCallback, useEffect, useState } from "react";

import parseError from "../utils/parseError";

function useFetch<T>(options: {
  options?: never;
  query: () => Promise<Response>;
}): {
  data: null | T;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
};

function useFetch<T, U>(options: {
  options: U;
  query: (args: U) => Promise<Response>;
}): {
  data: null | T;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
};

function useFetch<T, U>({
  options,
  query,
}: {
  options?: U;
  query: (args?: U) => Promise<Response>;
}) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await query({ ...options } as U);
      const responseData = (await response.json()) as T;

      setData(responseData);
    } catch (err: unknown) {
      const errorMessage = parseError(err);
      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [query, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
}

export default useFetch;
