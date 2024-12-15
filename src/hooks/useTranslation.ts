import { ar } from '../i18n/ar';

export const useTranslation = () => {
  const t = (key: string) => {
    try {
      const keys = key.split('.');
      let value: any = ar;
      
      for (const k of keys) {
        if (!value || !value[k]) {
          console.warn(`Translation missing for key: ${key}`);
          return key;
        }
        value = value[k];
      }
      
      return value;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  return { t };
};