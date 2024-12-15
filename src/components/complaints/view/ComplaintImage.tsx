import React, { useState } from 'react';
import { ExternalLink, ZoomIn, Download, X } from 'lucide-react';

interface ComplaintImageProps {
  imageUrl: string;
}

export const ComplaintImage = ({ imageUrl }: ComplaintImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `مرفق-البلاغ.${blob.type.split('/')[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">المرفقات</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="relative group max-w-2xl mx-auto">
          {/* Thumbnail Image */}
          <div className="aspect-video relative rounded-lg overflow-hidden bg-white shadow-md">
            <img 
              src={imageUrl} 
              alt="مرفق البلاغ" 
              className="w-full h-full object-contain"
            />
            
            {/* Image Actions Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  title="تكبير الصورة"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
                <a 
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  title="فتح في نافذة جديدة"
                >
                  <ExternalLink className="w-5 h-5 text-gray-700" />
                </a>
                <button
                  onClick={handleDownload}
                  className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  title="تحميل الصورة"
                >
                  <Download className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl mx-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <img 
              src={imageUrl} 
              alt="مرفق البلاغ" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};