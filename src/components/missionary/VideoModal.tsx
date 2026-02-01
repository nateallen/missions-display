'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  missionaryName: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, missionaryName }: VideoModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Extract video ID and determine platform
  const getEmbedUrl = (url: string): string | null => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }

    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 rounded-full bg-white/90 backdrop-blur-sm p-3 text-gray-900 shadow-lg hover:bg-white transition-all z-10"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${missionaryName} - Ministry Video`}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                <p>Unable to load video</p>
              </div>
            )}
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold text-white">{missionaryName}</h3>
          <p className="text-sm text-white/70 mt-1">Ministry Video</p>
        </div>
      </div>
    </div>
  );
}
