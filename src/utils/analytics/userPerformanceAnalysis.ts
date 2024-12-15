import { Complaint } from '../../types';
import { User } from '../../types/auth';
import { differenceInHours } from 'date-fns';

export const getUserPerformanceAnalysis = (complaints: Complaint[], users: User[]) => {
  return users.map(user => {
    const userComplaints = complaints.filter(c => 
      c.createdBy === user.id || c.lastUpdatedBy === user.id
    );
    
    const closedComplaints = userComplaints.filter(c => c.status === 'closed');
    
    // Calculate completion rate
    const completionRate = userComplaints.length ? 
      (closedComplaints.length / userComplaints.length) * 100 : 0;

    // Calculate average response speed
    const totalResponseTime = closedComplaints.reduce((acc, complaint) => {
      const created = new Date(complaint.createdAt);
      const closed = new Date(complaint.updatedAt);
      return acc + differenceInHours(closed, created);
    }, 0);
    
    const avgResponseTime = closedComplaints.length ? 
      totalResponseTime / closedComplaints.length : 0;
    
    // Convert response time to a 0-100 scale (lower is better)
    const responseSpeed = Math.max(0, 100 - (avgResponseTime / 24) * 10);

    // Simulate other metrics (in a real app, these would come from actual data)
    const satisfaction = Math.min(100, completionRate + Math.random() * 20);
    const solutionQuality = Math.min(100, completionRate + Math.random() * 15);
    const efficiency = Math.min(100, responseSpeed + Math.random() * 10);

    return {
      name: user.name,
      completionRate: Math.round(completionRate),
      responseSpeed: Math.round(responseSpeed),
      satisfaction: Math.round(satisfaction),
      solutionQuality: Math.round(solutionQuality),
      efficiency: Math.round(efficiency),
    };
  });
};