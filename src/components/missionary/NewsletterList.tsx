'use client';

import { Newsletter } from '@/types';
import { Calendar, Download, FileText } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import Image from 'next/image';
import { useState } from 'react';

interface NewsletterListProps {
  newsletters: Newsletter[];
}

function NewsletterThumbnail({ newsletter }: { newsletter: Newsletter }) {
  const [imageError, setImageError] = useState(false);
  const hasThumbnail = newsletter.thumbnailUrl && !imageError;

  if (!hasThumbnail) {
    return (
      <div className="flex h-24 w-[4.5rem] items-center justify-center rounded-lg bg-red-600 text-white flex-shrink-0 shadow-md">
        <FileText className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="relative h-24 w-[4.5rem] flex-shrink-0 rounded-lg overflow-hidden shadow-md group-hover:scale-105 transition-transform">
      <Image
        src={newsletter.thumbnailUrl}
        alt={newsletter.title}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function NewsletterList({ newsletters }: NewsletterListProps) {
  const { openPDFViewer } = useUIStore();

  if (newsletters.length === 0) {
    return (
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Newsletters</h2>
        <p className="text-gray-400">No newsletters available yet.</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        Newsletters ({newsletters.length})
      </h2>
      <div className="space-y-3">
        {newsletters.map((newsletter) => (
          <div
            key={newsletter.id}
            onClick={() => openPDFViewer(newsletter.pdfUrl, newsletter.title)}
            className="group flex items-start gap-4 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all cursor-pointer touch-manipulation active:scale-[0.98] border-2 border-transparent hover:border-gray-500"
          >
            <NewsletterThumbnail newsletter={newsletter} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors">
                  {newsletter.title}
                </h3>
                {newsletter.featured && (
                  <span className="inline-block rounded-full bg-yellow-900/50 px-2 py-1 text-xs font-medium text-yellow-200 flex-shrink-0">
                    Featured
                  </span>
                )}
              </div>
              {newsletter.description && (
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {newsletter.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(newsletter.publishDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{formatFileSize(newsletter.fileSize)}</span>
                </div>
                {newsletter.pageCount && <span>{newsletter.pageCount} pages</span>}
              </div>
              {newsletter.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {newsletter.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-gray-600 px-2 py-0.5 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
