import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../config';
import { handleError } from '../../../utils/errors';

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw handleError(error);
  }
};