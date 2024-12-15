import { User } from './auth';

export interface Note {
  id: string;
  complaintId: string;
  content: string;
  author: string;
  createdAt: Date | string;
}

export interface NoteWithAuthor extends Note {
  authorDetails?: User;
}