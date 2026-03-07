import {
  useMutation,
  useQueryClient,
  type MutationFunction,
  type QueryKey,
} from "@tanstack/react-query";

interface useApiMutationOptions<TVariables, TResult> {
  mutationFn: MutationFunction<TResult, TVariables>; // функція мутації
  invalidateKeys?: QueryKey[] | ((variables: TVariables) => QueryKey[]);
  onSuccessCallback?: (data: TResult) => void;
  onErrorCallback?: (error: string) => void;
}

export const useApiMutation = <TVariables, TResult>({
  mutationFn,
  invalidateKeys,
  onSuccessCallback,
  onErrorCallback,
}: useApiMutationOptions<TVariables, TResult>) => {
  const queryClient = useQueryClient();

  return useMutation<TResult, string, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      // Додаємо variables сюди
      if (invalidateKeys) {
        // Визначаємо ключі: або масив, або результат виконання функції
        const keysToInvalidate =
          typeof invalidateKeys === "function"
            ? invalidateKeys(variables)
            : invalidateKeys;

        keysToInvalidate.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      const serverMessage = error || "Сталася помилка";
      if (onErrorCallback) onErrorCallback(serverMessage);
    },
  });
};
