import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { isValidCategory } from '../config/categories';

// تحقق من صحة التصنيف
export const validateCategory = (category: string): string | null => {
  if (!category) {
    return 'يرجى اختيار التصنيف';
  }
  
  if (!isValidCategory(category)) {
    return 'التصنيف غير صحيح';
  }
  
  return null;
};

// تحقق من صحة البريد الإلكتروني
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'يرجى إدخال البريد الإلكتروني';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'يرجى إدخال بريد إلكتروني صحيح';
  }
  
  return null;
};

// تحقق من صحة كلمة المرور
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'يرجى إدخال كلمة المرور';
  }
  
  if (password.length < 6) {
    return 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل';
  }
  
  return null;
};

// تحقق من صحة رقم الهاتف
export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone) return null; // Optional field

  try {
    // Try to parse and validate the phone number
    if (!isValidPhoneNumber(phone)) {
      return 'يرجى إدخال رقم هاتف صحيح';
    }

    // Parse the phone number to get additional information
    const phoneNumber = parsePhoneNumber(phone);
    if (!phoneNumber) {
      return 'يرجى إدخال رقم هاتف صحيح';
    }

    return null;
  } catch (error) {
    return 'يرجى إدخال رقم هاتف صحيح';
  }
};