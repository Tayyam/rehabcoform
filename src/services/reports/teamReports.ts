import { getComplaints } from '../../lib/firebase';
import { useAuthStore } from '../../store/useAuthStore';
import { calculateTeamStats } from '../../utils/teamStats';
import { exportComplaintsToCSV } from '../../utils/export';

export const exportTeamReport = async () => {
  try {
    const complaints = await getComplaints();
    const users = useAuthStore.getState().users;
    const stats = calculateTeamStats(complaints, users);

    const reportData = stats.teamPerformance.map(member => ({
      'اسم الموظف': member.name,
      'الشكاوى المنشأة': member.createdCount,
      'الشكاوى المغلقة': member.closedCount,
      'نسبة النجاح': `${member.successRate}%`,
      'متوسط وقت الإغلاق': `${member.avgClosureTime} ساعة`,
    }));

    // Create CSV content with BOM for Arabic support
    const csvContent = '\ufeff' + [
      Object.keys(reportData[0]),
      ...reportData.map(row => Object.values(row))
    ].map(row => row.join(',')).join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير_أداء_الفريق_${new Date().toLocaleDateString('ar-SA')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting team report:', error);
    throw error;
  }
};