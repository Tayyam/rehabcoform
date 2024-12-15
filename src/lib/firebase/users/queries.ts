import { 
  collection,
  query,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../config';
import { User } from '../../../types/auth';
import { handleError } from '../../../utils/errors';

export const getUsers = async (): Promise<User[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  } catch (error) {
    throw handleError(error);
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', id));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  } catch (error) {
    throw handleError(error);
  }
};