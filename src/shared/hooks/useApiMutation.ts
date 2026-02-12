import {
  useMutation,
  useQueryClient,
  type MutationFunction,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface useApiMutationOptions<TVariables, TResult> {
  mutationFn: MutationFunction<TResult, TVariables>; // функція мутації
  invalidateKeys?: Array<readonly unknown[]>;
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
    onSuccess: (data) => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {

      const serverMessage = error || "Сталася помилка";
      if (onErrorCallback) onErrorCallback(serverMessage);
    },
  });
};
