import React, { useRef, useState } from 'react';
import { Upload, FileDown, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { parseCSV, generateExampleCSV } from '../../utils/csv/importUtils';
import { useStore } from '../../store/useStore';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { SuccessNotification } from '../common/SuccessNotification';

export const ImportComplaintsButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Array<{ row: number; column: string; message: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const addComplaint = useStore(state => state.addComplaint);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setErrors([]);

    try {
      const { data, errors } = await parseCSV(file);
      
      if (errors.length > 0) {
        setErrors(errors);
        setIsModalOpen(true);
      } else {
        // Import valid complaints
        for (const row of data) {
          await addComplaint({
            type: row['نوع البلاغ'],
            title: row['العنوان'],
            description: row['الوصف'],
            category: row['التصنيف'],
            status: row['الحالة'],
            priority: row['الأولوية'],
            pilgrimName: row['اسم الحاج'],
            passportNumber: row['رقم جواز السفر'],
            phoneNumber: row['رقم الهاتف'],
            deliveryMethod: row['طريقة الاستلام'],
            attachments: []
          });
        }
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error importing complaints:', error);
      setErrors([{ row: 0, column: '', message: 'حدث خطأ أثناء معالجة الملف' }]);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          className="hidden"
          onChange={handleFileSelect}
        />
        
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="flex items-center"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <Upload className="w-4 h-4 ml-2" />
              رفع البلاغات
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={generateExampleCSV}
          className="flex items-center"
        >
          <FileDown className="w-4 h-4 ml-2" />
          مثال للرفع
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="أخطاء في ملف الرفع"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-500">
                يوجد أخطاء في الملف المرفوع
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                يرجى تصحيح الأخطاء التالية وإعادة المحاولة
              </p>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 space-y-2">
            {errors.map((error, index) => (
              <div key={index} className="text-sm text-red-600">
                <span className="font-medium">
                  سطر {error.row}
                  {error.column && ` - عمود "${error.column}"`}:
                </span>{' '}
                {error.message}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              حسناً
            </Button>
          </div>
        </div>
      </Modal>

      {showSuccess && (
        <SuccessNotification
          message="تم استيراد البلاغات بنجاح"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
};