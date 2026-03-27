import { useGetNotes, useSaveNote, getGetNotesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function useNotes() {
  const query = useGetNotes();
  return {
    ...query,
    getNoteForLesson: (lessonId: string) => 
      query.data?.find(n => n.lessonId === lessonId)
  };
}

export function useSaveLessonNote() {
  const queryClient = useQueryClient();
  const mutation = useSaveNote({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetNotesQueryKey() });
      }
    }
  });

  return {
    ...mutation,
    saveNote: (lessonId: string, content: string) => {
      mutation.mutate({ lessonId, data: { content } });
    }
  };
}
