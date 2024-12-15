export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public status: number = 500,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): AppError => {
  // Handle Firebase errors
  if (error && typeof error === 'object' && 'code' in error) {
    const firebaseError = error as { code: string; message: string };
    switch (firebaseError.code) {
      case 'permission-denied':
        return new AppError('ليس لديك صلاحية للقيام بهذا الإجراء', 'PERMISSION_DENIED', 403, error);
      case 'not-found':
        return new AppError('لم يتم العثور على البيانات المطلوبة', 'NOT_FOUND', 404, error);
      case 'invalid-argument':
        return new AppError('البيانات المدخلة غير صحيحة', 'INVALID_INPUT', 400, error);
      default:
        return new AppError(firebaseError.message, firebaseError.code, 500, error);
    }
  }

  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'INTERNAL_ERROR', 500, error);
  }

  return new AppError('حدث خطأ غير متوقع', 'UNKNOWN_ERROR', 500, error);
};