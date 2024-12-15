import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config';

export const subscribeToAuthChanges = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};