import { Complaint } from '../../types';
import { differenceInHours } from 'date-fns';

export const getResponseTimeAnalysis = (complaints: Complaint[]) => {
  const closedComplaints = complaints.filter(c => c.status === 'closed');
  
  const responseTimes = {
    lessThan24h: 0,
    between24and48h: 0,
    between2and5d: 0,
    moreThan5d: 0,
  };

  closedComplaints.forEach(complaint => {
    const created = new Date(complaint.createdAt);
    const closed = new Date(complaint.updatedAt);
    const hours = differenceInHours(closed, created);

    if (hours < 24) {
      responseTimes.lessThan24h++;
    } else if (hours < 48) {
      responseTimes.between24and48h++;
    } else if (hours < 120) { // 5 days
      responseTimes.between2and5d++;
    } else {
      responseTimes.moreThan5d++;
    }
  });

  return responseTimes;
};