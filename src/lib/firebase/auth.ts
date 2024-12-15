import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './config';
import { User } from '../../types/auth';
import { getUserById } from './users';
import { handleError } from '../../utils/errors';

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUserById(userCredential.user.uid);
    
    if (!user) {
      throw new Error('User document not found');
    }
    
    return user;
  } catch (error) {
    throw handleError(error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw handleError(error);
  }
};

export const updatePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error('No authenticated user');
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await firebaseUpdatePassword(user, newPassword);
  } catch (error) {
    throw handleError(error);
  }
};

export const subscribeToAuthChanges = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};