// Add ComplaintType to existing types
export type ComplaintType = 'inquiry' | 'complaint';

export interface Complaint {
  id: string;
  type: ComplaintType;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: 'low' | 'medium' | 'high';
  pilgrimName: string;
  passportNumber?: string;
  phoneNumber?: string;
  deliveryMethod: DeliveryMethod;
  assignedTo?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  lastUpdatedBy: string;
  imageUrl?: string; // Legacy field
  attachments: Array<{
    url: string;
    type: string;
    name: string;
  }>;
}