import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
  serverTimestamp,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from './config';
import { Complaint, ComplaintStatus } from '../../types';
import { handleError } from '../../utils/errors';

const COMPLAINTS_COLLECTION = 'complaints';

export const getComplaints = async () => {
  try {
    const q = query(collection(db, COMPLAINTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt instanceof Timestamp ? 
        doc.data().createdAt.toDate().toISOString() : 
        doc.data().createdAt,
      updatedAt: doc.data().updatedAt instanceof Timestamp ? 
        doc.data().updatedAt.toDate().toISOString() : 
        doc.data().updatedAt,
    })) as Complaint[];
  } catch (error) {
    throw handleError(error);
  }
};

export const addComplaint = async (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'lastUpdatedBy'>) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const complaintData = {
      ...complaint,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: auth.currentUser.uid,
      lastUpdatedBy: auth.currentUser.uid,
      passportNumber: complaint.passportNumber || null,
      attachments: []
    };

    const docRef = await addDoc(collection(db, COMPLAINTS_COLLECTION), complaintData);
    return docRef.id;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateComplaintStatus = async (id: string, status: ComplaintStatus) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const complaintRef = doc(db, COMPLAINTS_COLLECTION, id);
    await updateDoc(complaintRef, {
      status,
      updatedAt: serverTimestamp(),
      lastUpdatedBy: auth.currentUser.uid,
    });
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteComplaint = async (id: string) => {
  try {
    await deleteDoc(doc(db, COMPLAINTS_COLLECTION, id));
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteAllComplaints = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COMPLAINTS_COLLECTION));
    const batch = writeBatch(db);
    
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
  } catch (error) {
    throw handleError(error);
  }
};