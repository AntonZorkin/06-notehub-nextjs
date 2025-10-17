import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type PageProps = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: PageProps) => {
    const queryClient = new QueryClient();
    
  const { id } = await params;
    // const noteId = Number(id);
    // if (!Number.isFinite(noteId) || noteId <= 0) {
    // throw new Error("Invalid note id");
    // }
    
  try {
    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Could not fetch the note. ${message}`);
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient  />
    </HydrationBoundary>
  );
};
export default NoteDetails;
