import React, { useState } from 'react';
import { Image, Download, ExternalLink, X } from 'lucide-react';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

interface Attachment {
  url: string;
  type: string;
  name: string;
}

interface ComplaintAttachmentsProps {
  attachments: Attachment[];
}

export const ComplaintAttachments = ({ attachments }: ComplaintAttachmentsProps) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDownload = async (attachment: Attachment) => {
    try {
      setLoading(prev => ({ ...prev, [attachment.url]: true }));
      const response = await fetch(attachment.url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading attachment:', error);
    } finally {
      setLoading(prev => ({ ...prev, [attachment.url]: false }));
    }
  };

  const openImageViewer = (url: string) => {
    setSelectedImage(url);
    setViewerOpen(true);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">المرفقات</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attachments.map((attachment, index) => (
          <div 
            key={attachment.url}
            className="relative group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-primary-main transition-colors"
          >
            <div className="aspect-video relative">
              <img 
                src={attachment.url} 
                alt={attachment.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openImageViewer(attachment.url)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300?text=Error+Loading+Image';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openImageViewer(attachment.url)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    title="عرض الصورة"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDownload(attachment)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    disabled={loading[attachment.url]}
                    title="تحميل المرفق"
                  >
                    {loading[attachment.url] ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Download className="w-5 h-5 text-gray-700" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Image className="w-4 h-4 ml-2" />
                <span className="truncate">{attachment.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Image Viewer */}
      {viewerOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setViewerOpen(false)}
            className="absolute top-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <img 
            src={selectedImage} 
            alt="عرض كامل الشاشة"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};