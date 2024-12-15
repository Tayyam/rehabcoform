import { 
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config';
import { Note } from '../../../types';
import { handleError } from '../../../utils/errors';
import { fromFirestoreDate } from '../../../utils/firebase';

const NOTES_COLLECTION = 'notes';

export const getNotesByComplaintId = async (complaintId: string): Promise<Note[]> => {
  try {
    const q = query(
      collection(db, NOTES_COLLECTION),
      where('complaintId', '==', complaintId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      complaintId,
      content: doc.data().content,
      author: doc.data().author,
      createdAt: fromFirestoreDate(doc.data().createdAt),
    })) as Note[];
  } catch (error) {
    throw handleError(error);
  }
};