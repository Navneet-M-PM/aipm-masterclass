import { useGetProgress, useUpdateProgress, getGetProgressQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function useProgress() {
  const query = useGetProgress();
  return {
    ...query,
    // Helper to easily check if a lesson is completed
    isCompleted: (lessonId: string) => 
      query.data?.some(p => p.lessonId === lessonId && p.completed) ?? false,
    // Calculate total progress
    totalCompleted: query.data?.filter(p => p.completed).length ?? 0
  };
}

export function useSaveProgress() {
  const queryClient = useQueryClient();
  const mutation = useUpdateProgress({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
      }
    }
  });

  return {
    ...mutation,
    toggleProgress: (lessonId: string, currentStatus: boolean) => {
      mutation.mutate({
        data: { lessonId, completed: !currentStatus }
      });
    }
  };
}
