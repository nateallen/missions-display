'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';
import { Missionary } from '@/types';

interface MissionaryCardProps {
  missionary: Missionary;
  variant?: 'compact' | 'expanded';
}

export default function MissionaryCard({ missionary, variant = 'compact' }: MissionaryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/missionary/${missionary.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl bg-gray-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer touch-manipulation select-none border border-gray-600"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-600 to-gray-700">
        <Image
          src={missionary.profilePhoto}
          alt={missionary.fullName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-3 lg:p-4">
        <h3 className="text-lg lg:text-xl font-bold text-white mb-1 line-clamp-1">
          {missionary.fullName}
        </h3>

        <div className="flex items-center gap-2 text-gray-300 mb-2">
          <MapPin className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
          <span className="text-xs lg:text-sm line-clamp-1">
            {missionary.location.city ? `${missionary.location.city}, ` : ''}
            {missionary.location.country}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-300 mb-2">
          <Calendar className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
          <span className="text-xs lg:text-sm">
            {missionary.metadata.yearsOfService} years of service
          </span>
        </div>

        <p className="text-xs lg:text-sm text-gray-100 font-medium mb-1">
          {missionary.metadata.ministry}
        </p>

        {variant === 'expanded' && (
          <p className="text-xs lg:text-sm text-gray-300 line-clamp-3">
            {missionary.bio}
          </p>
        )}

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {missionary.metadata.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-gray-600/50 px-2 py-0.5 text-xs font-medium text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute top-3 right-3 bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          className="h-5 w-5 text-white"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </div>
  );
}
