import React from 'react';
import { Modal } from '../common/Modal';
import { Complaint } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { formatDate } from '../../utils/formatters';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../common/Button';
import { Clock, Tag, AlertCircle, MessageSquare } from 'lucide-react';

interface ViewComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: Complaint;
}

export const ViewComplaintModal = ({ isOpen, onClose, complaint }: ViewComplaintModalProps) => {
  const { t } = useTranslation();
  const users = useAuthStore((state) => state.getUsers());
  const createdByUser = users.find(u => u.id === complaint.createdBy);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={complaint.title}
    >
      <div className="flex flex-col space-y-6">
        {/* Status Badge */}
        <div className="bg-yellow-50 px-4 py-2 rounded-lg">
          <span className="text-sm font-medium text-yellow-800">
            {t(`status.${complaint.status}`)}
          </span>
        </div>

        {/* Main Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">{t('complaints.createdAt')}</div>
              <div className="text-sm font-medium">{formatDate(complaint.createdAt)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Tag className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">{t('complaints.category')}</div>
              <div className="text-sm font-medium">{t(`categories.${complaint.category}`)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">{t('complaints.priority')}</div>
              <div className="text-sm font-medium">{t(`priority.${complaint.priority}`)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">{t('complaints.createdBy')}</div>
              <div className="text-sm font-medium">{createdByUser?.name || t('general.unknown')}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-medium mb-2">{t('complaints.description')}</h3>
          <p className="text-gray-600">{complaint.description}</p>
        </div>

        {/* Updates Timeline */}
        <div>
          <h3 className="text-lg font-medium mb-4">سجل التحديثات</h3>
          <div className="border-r-2 border-gray-200 pr-4 space-y-6">
            <div className="relative">
              <div className="absolute right-[-1.25rem] top-1 w-4 h-4 bg-primary-main rounded-full border-2 border-white"></div>
              <div className="mb-1">
                <div className="text-sm font-medium">مفتوحة</div>
                <div className="text-sm text-gray-500">
                  آخر تحديث بواسطة: {createdByUser?.name || t('general.unknown')}
                </div>
                <div className="text-sm text-gray-500">{formatDate(complaint.updatedAt)}</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute right-[-1.25rem] top-1 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
              <div className="mb-1">
                <div className="text-sm font-medium">تم إنشاء الشكوى</div>
                <div className="text-sm text-gray-500">
                  بواسطة: {createdByUser?.name || t('general.unknown')}
                </div>
                <div className="text-sm text-gray-500">{formatDate(complaint.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
          <Button variant="primary">
            بدء المعالجة
          </Button>
        </div>
      </div>
    </Modal>
  );
};