import { 
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db, auth } from '../config';
import { handleError } from '../../../utils/errors';
import { noteSchema } from './schema';

const NOTES_COLLECTION = 'notes';

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

    // Validate note data
    noteSchema.parse({
      ...noteData,
      id: 'temp',
      createdAt: new Date(),
    });

    const docRef = await addDoc(collection(db, NOTES_COLLECTION), noteData);
    return docRef.id;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteNotesByComplaintId = async (complaintId: string): Promise<void> => {
  try {
    const q = query(
      collection(db, NOTES_COLLECTION),
      where('complaintId', '==', complaintId)
    );

    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    
    await Promise.all(deletePromises);
  } catch (error) {
    throw handleError(error);
  }
};