import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  type = 'warning'
}: ConfirmDialogProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'text-red-600',
          bg: 'bg-red-50',
          button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        };
      case 'warning':
        return {
          icon: 'text-yellow-600',
          bg: 'bg-yellow-50',
          button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
        };
      default:
        return {
          icon: 'text-blue-600',
          bg: 'bg-blue-50',
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center">
        <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${styles.bg}`}>
          <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
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
          {cancelText}
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};