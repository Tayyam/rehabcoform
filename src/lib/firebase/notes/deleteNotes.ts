import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../config';
import { handleError } from '../../../utils/errors';

export const deleteNotesByComplaintId = async (complaintId: string): Promise<void> => {
  try {
    // Query all notes for this complaint
    const q = query(
      collection(db, 'notes'),
      where('complaintId', '==', complaintId)
    );

    const querySnapshot = await getDocs(q);
    
    // Delete each note
    const deletePromises = querySnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    
    await Promise.all(deletePromises);
  } catch (error) {
    throw handleError(error);
  }
};