import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';
import { User } from '../../../types/auth';
import { getUserById } from '../users';
import { handleError } from '../../../utils/errors';

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