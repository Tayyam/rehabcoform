import { Complaint } from '../../types';

export const getCategoryAnalysis = (complaints: Complaint[]) => {
  const categories = {
    administrative: 0,
    health: 0,
    transport: 0,
    accommodation: 0,
    food: 0,
  };

  complaints.forEach(complaint => {
    if (complaint.category in categories) {
      categories[complaint.category as keyof typeof categories]++;
    }
  });

  return categories;
};