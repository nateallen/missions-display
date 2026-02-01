'use client';

import { Missionary } from '@/types';
import { MapPin, Briefcase, Building2, Calendar } from 'lucide-react';

interface MissionaryBioProps {
  missionary: Missionary;
}

export default function MissionaryBio({ missionary }: MissionaryBioProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">About</h2>

      <p className="text-lg text-gray-300 leading-relaxed mb-6">{missionary.bio}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600/50 flex-shrink-0">
            <MapPin className="h-5 w-5 text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Location</p>
            <p className="text-base font-semibold text-white">
              {missionary.location.city && `${missionary.location.city}, `}
              {missionary.location.country}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600/50 flex-shrink-0">
            <Briefcase className="h-5 w-5 text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Ministry Focus</p>
            <p className="text-base font-semibold text-white">
              {missionary.metadata.ministry}
            </p>
          </div>
        </div>

        {missionary.metadata.organization && (
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600/50 flex-shrink-0">
              <Building2 className="h-5 w-5 text-gray-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Organization</p>
              <p className="text-base font-semibold text-white">
                {missionary.metadata.organization}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600/50 flex-shrink-0">
            <Calendar className="h-5 w-5 text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">On Field Since</p>
            <p className="text-base font-semibold text-white">
              {formatDate(missionary.metadata.startDate)} ({missionary.metadata.yearsOfService}{' '}
              years)
            </p>
          </div>
        </div>
      </div>

      {/* Tags */}
      {missionary.metadata.tags.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-400 mb-2">Ministry Tags</p>
          <div className="flex flex-wrap gap-2">
            {missionary.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-gray-600/50 px-3 py-1 text-sm font-medium text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
