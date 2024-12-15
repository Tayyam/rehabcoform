export const VALIDATION_RULES = {
  password: {
    minLength: 6,
    maxLength: 50,
    requireNumbers: true,
    requireSpecialChars: true
  },
  phone: {
    allowedCountries: ['SA', 'AE', 'KW', 'BH', 'QA', 'OM'],
    defaultCountry: 'SA'
  },
  complaint: {
    titleMinLength: 10,
    titleMaxLength: 100,
    descriptionMinLength: 20,
    descriptionMaxLength: 1000
  }
} as const;

export const VALIDATION_MESSAGES = {
  required: 'هذا الحقل مطلوب',
  email: 'يرجى إدخال بريد إلكتروني صحيح',
  phone: 'يرجى إدخال رقم هاتف صحيح',
  password: {
    length: `يجب أن تتكون كلمة المرور من ${VALIDATION_RULES.password.minLength} أحرف على الأقل`,
    match: 'كلمة المرور غير متطابقة',
    requirements: 'يجب أن تحتوي كلمة المرور على أرقام وحروف خاصة'
  }
} as const;