import { Complaint } from '../types';

export const getMonthlyStats = (complaints: Complaint[]) => {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date;
  }).reverse();

  return last6Months.map(date => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthlyComplaints = complaints.filter(complaint => {
      const complaintDate = new Date(complaint.createdAt);
      return complaintDate.getMonth() === month && complaintDate.getFullYear() === year;
    });

    return {
      month: date.toLocaleDateString('ar-SA', { month: 'long' }),
      total: monthlyComplaints.length,
      closed: monthlyComplaints.filter(c => c.status === 'closed').length,
      inProgress: monthlyComplaints.filter(c => c.status === 'in-progress').length,
    };
  });
};

export const getCategoryDistribution = (complaints: Complaint[]) => {
  const categories = {
    administrative: 0,
    health: 0,
    transport: 0,
    accommodation: 0,
    food: 0,
  };

  complaints.forEach(complaint => {
    categories[complaint.category]++;
  });

  return categories;
};

export const getPerformanceMetrics = (complaints: Complaint[]) => {
  const total = complaints.length;
  const closed = complaints.filter(c => c.status === 'closed').length;
  const avgResolutionTime = complaints
    .filter(c => c.status === 'closed')
    .reduce((acc, curr) => {
      const created = new Date(curr.createdAt);
      const updated = new Date(curr.updatedAt);
      return acc + (updated.getTime() - created.getTime());
    }, 0) / (closed || 1);

  return {
    resolutionRate: total ? (closed / total) * 100 : 0,
    avgResolutionTime: Math.round(avgResolutionTime / (1000 * 60 * 60 * 24)), // Convert to days
  };
};