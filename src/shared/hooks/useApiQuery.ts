import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useApiQuery = <T>(
  queryKey: any[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery<T, Error>({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // Значення за замовчуванням
    ...options, // Можна перевизначити будь-які налаштування
  });

  return {
    data: data as T, // Кастуємо до типу T
    list: (data || []) as T, // Зручно для масивів
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
