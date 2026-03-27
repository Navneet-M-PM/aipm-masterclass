import { useGetCapstone, useUpdateCapstone, getGetCapstoneQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function useCapstone() {
  return useGetCapstone();
}

export function useSaveCapstone() {
  const queryClient = useQueryClient();
  return useUpdateCapstone({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCapstoneQueryKey() });
      }
    }
  });
}
