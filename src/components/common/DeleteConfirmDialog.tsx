import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteConfirmDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {message}
        </p>
      </div>

      <div className="mt-6 flex justify-center space-x-3 rtl:space-x-reverse">
        <Button
          variant="outline"
          onClick={onClose}
        >
          إلغاء
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          حذف
        </Button>
      </div>
    </Modal>
  );
};