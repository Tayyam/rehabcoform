import { Complaint } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';

const createCsvContent = (data: any[]) => {
  const headers = Object.keys(data[0]);
  const rows = data.map(item => headers.map(header => item[header]));
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

export const exportTeamReport = async () => {
  try {
    const complaints = await getComplaints();
    const users = useAuthStore.getState().getUsers();
    const stats = calculateTeamStats(complaints, users);

    const reportData = stats.teamPerformance.map(member => ({
      'اسم الموظف': member.name,
      'الشكاوى المنشأة': member.createdCount,
      'الشكاوى المغلقة': member.closedCount,
      'نسبة النجاح': `${member.successRate}%`,
      'متوسط وقت الإغلاق': `${member.avgClosureTime} ساعة`,
    }));

    const csvContent = '\ufeff' + createCsvContent(reportData); // Add BOM for Arabic support
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير_أداء_الفريق_${new Date().toLocaleDateString('ar-SA')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting report:', error);
    throw error;
  }
};