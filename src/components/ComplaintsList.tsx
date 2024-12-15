import React from 'react';
import { useStore } from '../store/useStore';
import { Complaint } from '../types';
import { format } from 'date-fns';

export const ComplaintsList = () => {
  const complaints = useStore((state) => state.complaints);
  const updateStatus = useStore((state) => state.updateComplaintStatus);

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      closed: 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {complaint.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{complaint.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(complaint.createdAt), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select
                    className="text-sm border rounded-md"
                    value={complaint.status}
                    onChange={(e) => updateStatus(complaint.id, e.target.value as Complaint['status'])}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};