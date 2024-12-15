import { z } from 'zod';

export const noteSchema = z.object({
  id: z.string(),
  complaintId: z.string(),
  content: z.string().min(1),
  author: z.string(),
  createdAt: z.date(),
});

export type NoteSchema = z.infer<typeof noteSchema>;