import { 
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
} from 'firebase/auth';
import { auth } from '../config';
import { handleError } from '../../../utils/errors';

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