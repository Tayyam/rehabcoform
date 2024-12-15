import { Complaint } from '../types';
import { User } from '../types/auth';
import { differenceInHours } from 'date-fns';

export const calculateTeamStats = (complaints: Complaint[], users: User[]) => {
  // Calculate overall stats
  const completedTasks = complaints.filter(c => c.status === 'closed').length;
  const pendingTasks = complaints.filter(c => c.status === 'open').length;
  const totalTasks = complaints.length;

  // Calculate average response time for closed complaints
  const closedComplaints = complaints.filter(c => c.status === 'closed');
  const totalResponseTime = closedComplaints.reduce((acc, complaint) => {
    const created = new Date(complaint.createdAt);
    const updated = new Date(complaint.updatedAt);
    return acc + differenceInHours(updated, created);
  }, 0);
  
  const avgResponseTime = closedComplaints.length ? 
    Math.round(totalResponseTime / closedComplaints.length) : 0;

  // Calculate overall success rate
  const successRate = totalTasks ? 
    Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate per-member stats
  const memberStats = users.map(user => {
    // Complaints created by this user
    const userCreatedComplaints = complaints.filter(c => c.createdBy === user.id);
    
    // Complaints closed by this user (based on lastUpdatedBy)
    const userClosedComplaints = complaints.filter(
      c => c.lastUpdatedBy === user.id && c.status === 'closed'
    );
    
    // Calculate average closure time for complaints closed by this user
    const totalClosureTime = userClosedComplaints.reduce((acc, complaint) => {
      const created = new Date(complaint.createdAt);
      const updated = new Date(complaint.updatedAt);
      return acc + differenceInHours(updated, created);
    }, 0);

    const avgClosureTime = userClosedComplaints.length ? 
      Math.round(totalClosureTime / userClosedComplaints.length) : 0;

    // Calculate efficiency rate (closed complaints vs assigned/created)
    const assignedComplaints = complaints.filter(c => 
      c.createdBy === user.id || c.lastUpdatedBy === user.id
    );

    const efficiencyRate = assignedComplaints.length ? 
      Math.round((userClosedComplaints.length / assignedComplaints.length) * 100) : 0;

    return {
      id: user.id,
      name: user.name,
      createdCount: userCreatedComplaints.length,
      closedCount: userClosedComplaints.length,
      avgClosureTime,
      efficiencyRate,
      // Calculate productivity score
      productivityScore: Math.round(
        (userClosedComplaints.length * 100) / (Math.max(userCreatedComplaints.length, 1))
      ),
    };
  });

  return {
    completedTasks,
    pendingTasks,
    avgResponseTime,
    successRate,
    memberStats,
    createdComplaintsByMember: memberStats.map(({ name, createdCount }) => ({
      name,
      count: createdCount
    })),
    closedComplaintsByMember: memberStats.map(({ name, closedCount }) => ({
      name,
      count: closedCount
    })),
    teamPerformance: memberStats.map(stats => ({
      ...stats,
      successRate: stats.efficiencyRate, // Renamed for UI consistency
    })),
  };
};