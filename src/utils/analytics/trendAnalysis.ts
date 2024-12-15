import { Complaint } from '../../types';
import { format, subMonths } from 'date-fns';
import { ar } from 'date-fns/locale';

export const getTrendAnalysis = (complaints: Complaint[]) => {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      month: format(date, 'MMMM', { locale: ar }),
      total: 0,
      closed: 0,
    };
  }).reverse();

  complaints.forEach(complaint => {
    const complaintDate = new Date(complaint.createdAt);
    const monthIndex = last6Months.findIndex(m => 
      format(complaintDate, 'MMMM', { locale: ar }) === m.month
    );
    
    if (monthIndex !== -1) {
      last6Months[monthIndex].total++;
      if (complaint.status === 'closed') {
        last6Months[monthIndex].closed++;
      }
    }
  });

  return last6Months;
};