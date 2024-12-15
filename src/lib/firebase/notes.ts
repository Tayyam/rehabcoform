import { 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from './config';
import { Note } from '../../types';
import { handleError } from '../../utils/errors';

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
      createdAt: doc.data().createdAt instanceof Timestamp ? 
        doc.data().createdAt.toDate() : 
        new Date(doc.data().createdAt),
    })) as Note[];
  } catch (error) {
    throw handleError(error);
  }
};

export const addNote = async (complaintId: string, content: string): Promise<string> => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const noteData = {
      complaintId,
      content,
      author: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, NOTES_COLLECTION), noteData);
    return docRef.id;
  } catch (error) {
    throw handleError(error);
  }
};