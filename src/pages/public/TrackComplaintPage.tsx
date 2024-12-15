import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Logo } from '../../components/common/Logo';
import { ArrowRight, Search } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const TrackComplaintPage = () => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [error, setError] = useState('');
  const [complaint, setComplaint] = useState<any>(null);
  const complaints = useStore((state) => state.complaints);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setComplaint(null);

    const found = complaints.find(
      (c) => c.id.slice(0, 8).toUpperCase() === referenceNumber.toUpperCase()
    );

    if (found) {
      setComplaint(found);
    } else {
      setError('لم يتم العثور على بلاغ بهذا الرقم');
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-yellow-50 text-yellow-800',
      'in-progress': 'bg-blue-50 text-blue-800',
      rejected: 'bg-red-50 text-red-800',
      closed: 'bg-green-50 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-50 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      open: 'مفتوح',
      'in-progress': 'قيد المعالجة',
      rejected: 'مرفوض',
      closed: 'مغلق',
    };
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Logo />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            متابعة حالة البلاغ
          </h2>
          <p className="mt-2 text-gray-600">
            أدخل رقم المتابعة للاطلاع على حالة بلاغك
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="رقم المتابعة"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="أدخل رقم المتابعة"
              required
              error={error}
            />

            <div className="flex items-center justify-between">
              <Link
                to="/public/complaint"
                className="flex items-center text-primary-main hover:text-primary-dark transition-colors"
              >
                <ArrowRight className="w-4 h-4 ml-2" />
                تقديم بلاغ جديد
              </Link>

              <Button
                type="submit"
                variant="primary"
                className="flex items-center"
              >
                <Search className="w-4 h-4 ml-2" />
                بحث
              </Button>
            </div>
          </form>

          {complaint && (
            <div className="mt-8 pt-8 border-t">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{complaint.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      تم الإنشاء: {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
                    <span className="text-sm font-medium">
                      {getStatusText(complaint.status)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">تفاصيل البلاغ</h4>
                  <p className="text-gray-600">{complaint.description}</p>
                </div>

                {complaint.notes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">التعليقات والملاحظات</h4>
                    <div className="space-y-4">
                      {complaint.notes.map((note: any) => (
                        <div key={note.id} className="bg-white p-4 rounded-lg border">
                          <p className="text-gray-600">{note.content}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {formatDate(note.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};