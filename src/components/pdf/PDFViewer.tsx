'use client';

import { useState } from 'react';
import { X, Download, Mail, MessageSquare } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';

export default function PDFViewer() {
  const { isPDFViewerOpen, currentPDFUrl, currentNewsletterTitle, closePDFViewer, openEmailForm } =
    useUIStore();

  const handleDownload = () => {
    if (currentPDFUrl) {
      const link = document.createElement('a');
      link.href = currentPDFUrl;
      link.download = currentPDFUrl.split('/').pop() || 'newsletter.pdf';
      link.click();
    }
  };

  const handleEmailPDF = () => {
    closePDFViewer();
    openEmailForm();
  };

  if (!isPDFViewerOpen || !currentPDFUrl) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col m-4 border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
          <h2 className="text-xl font-bold text-white truncate flex-1 mr-4">
            {currentNewsletterTitle || 'Newsletter'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors touch-manipulation active:scale-95"
            >
              <Download className="h-5 w-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handleEmailPDF}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition-colors touch-manipulation active:scale-95"
            >
              <Mail className="h-5 w-5" />
              <span className="hidden sm:inline">Email</span>
            </button>
            <button
              onClick={closePDFViewer}
              className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors touch-manipulation active:scale-95"
            >
              <X className="h-6 w-6 text-gray-200" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto bg-gray-900">
          <div className="flex items-center justify-center min-h-full p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-white mb-2">PDF Preview</h3>
              <p className="text-gray-400 mb-4">
                PDF viewer integration requires a sample PDF file.
              </p>
              <p className="text-sm text-gray-500">
                In production, this will display the full PDF with page navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
