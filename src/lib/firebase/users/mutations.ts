import { 
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../config';
import { User, UserRole, UserGender } from '../../../types/auth';
import { handleError } from '../../../utils/errors';

export const createUser = async (userData: {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  gender: UserGender;
}): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user: User = {
      id: userCredential.user.uid,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      gender: userData.gender,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser?.uid || 'system',
    };

    await setDoc(doc(db, 'users', user.id), user);
    return user;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    // Get the current user's data to check role
    const currentUserDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (!currentUserDoc.exists() || currentUserDoc.data().role !== 'admin') {
      throw new Error('Unauthorized operation');
    }

    // Don't allow deleting yourself
    if (userId === auth.currentUser.uid) {
      throw new Error('Cannot delete your own account');
    }

    await deleteDoc(doc(db, 'users', userId));
  } catch (error) {
    throw handleError(error);
  }
};