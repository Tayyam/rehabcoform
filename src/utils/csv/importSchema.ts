import { z } from 'zod';
import { isValidCategory } from '../../config/categories';

export const complaintImportSchema = z.object({
  'نوع البلاغ': z.enum(['inquiry', 'complaint'], {
    errorMap: () => ({ message: 'نوع البلاغ يجب أن يكون إما استفسار أو بلاغ' })
  }),
  العنوان: z.string().min(1, 'العنوان مطلوب'),
  الوصف: z.string().min(1, 'الوصف مطلوب'),
  التصنيف: z.string().refine(val => isValidCategory(val), {
    message: 'التصنيف غير صحيح'
  }),
  الحالة: z.enum(['open', 'in-progress', 'rejected', 'closed'], {
    errorMap: () => ({ message: 'الحالة غير صحيحة' })
  }),
  الأولوية: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'الأولوية غير صحيحة' })
  }),
  'اسم الحاج': z.string().min(1, 'اسم الحاج مطلوب'),
  'رقم جواز السفر': z.string().optional(),
  'رقم الهاتف': z.string().optional(),
  'طريقة الاستلام': z.enum(['email', 'phone', 'website'], {
    errorMap: () => ({ message: 'طريقة الاستلام غير صحيحة' })
  })
});

export type ComplaintImportSchema = z.infer<typeof complaintImportSchema>;