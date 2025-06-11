import { useEffect, useState } from "react";

function useFetch<T>(options: {
  options?: never;
  query: () => Promise<Response>;
}): { data: null | T; error: Error | null; isLoading: boolean };

function useFetch<T, U>(options: {
  options: U;
  query: (args: U) => Promise<Response>;
}): { data: null | T; error: Error | null; isLoading: boolean };

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await query({ ...options } as U);
        const responseData = (await response.json()) as T;

        setData(responseData);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err
            : new Error("알 수 없는 오류가 발생했습니다."),
        );
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, options]);

  return { data, error, isLoading };
}

export default useFetch;
