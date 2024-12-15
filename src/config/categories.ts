import { ComplaintCategory } from '../types';

// Define all available categories
export const CATEGORIES: Record<ComplaintCategory, {
  id: ComplaintCategory;
  label: string;
  description: string;
  icon?: string;
}> = {
  administrative: {
    id: 'administrative',
    label: 'إداري',
    description: 'للشكاوى والاستفسارات المتعلقة بالإجراءات الإدارية',
  },
  health: {
    id: 'health',
    label: 'صحي',
    description: 'للشكاوى والاستفسارات المتعلقة بالخدمات الصحية',
  },
  transport: {
    id: 'transport',
    label: 'نقل',
    description: 'للشكاوى والاستفسارات المتعلقة بخدمات النقل',
  },
  accommodation: {
    id: 'accommodation',
    label: 'سكن',
    description: 'للشكاوى والاستفسارات المتعلقة بالسكن والإقامة',
  },
  food: {
    id: 'food',
    label: 'تغذية',
    description: 'للشكاوى والاستفسارات المتعلقة بالوجبات والتغذية',
  },
};

// Helper function to get category options for dropdowns
export const getCategoryOptions = () => {
  return Object.values(CATEGORIES).map(category => ({
    value: category.id,
    label: category.label,
  }));
};

// Helper function to get category label
export const getCategoryLabel = (categoryId: ComplaintCategory): string => {
  return CATEGORIES[categoryId]?.label || categoryId;
};

// Helper function to get category description
export const getCategoryDescription = (categoryId: ComplaintCategory): string => {
  return CATEGORIES[categoryId]?.description || '';
};

// Helper function to validate category
export const isValidCategory = (category: string): category is ComplaintCategory => {
  return category in CATEGORIES;
};