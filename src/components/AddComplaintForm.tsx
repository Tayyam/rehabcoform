import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ComplaintCategory } from '../types';

export const AddComplaintForm = () => {
  const addComplaint = useStore((state) => state.addComplaint);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'administrative' as ComplaintCategory,
    priority: 'medium' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint({
      ...formData,
      status: 'open',
      attachments: [],
    });
    setFormData({
      title: '',
      description: '',
      category: 'administrative',
      priority: 'medium',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Complaint</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ComplaintCategory })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="administrative">Administrative</option>
              <option value="health">Health</option>
              <option value="transport">Transport</option>
              <option value="accommodation">Accommodation</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Complaint
        </button>
      </div>
    </form>
  );
};