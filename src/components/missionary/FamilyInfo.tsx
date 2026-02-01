'use client';

import { FamilyMember } from '@/types';
import { Cake, User } from 'lucide-react';

interface FamilyInfoProps {
  family: FamilyMember[];
}

export default function FamilyInfo({ family }: FamilyInfoProps) {
  if (family.length === 0) {
    return null;
  }

  const formatBirthday = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  // Sort family members: other first, spouse second, then children by birth order (oldest to youngest)
  const sortedFamily = [...family].sort((a, b) => {
    // Other (primary missionary) always first
    if (a.relationship === 'other' && b.relationship !== 'other') return -1;
    if (b.relationship === 'other' && a.relationship !== 'other') return 1;

    // Spouse always second
    if (a.relationship === 'spouse' && b.relationship === 'child') return -1;
    if (b.relationship === 'spouse' && a.relationship === 'child') return 1;

    // Children sorted by age (oldest first)
    if (a.relationship === 'child' && b.relationship === 'child') {
      if (!a.birthday || !b.birthday) return 0;
      return a.birthday.getTime() - b.birthday.getTime(); // Earlier birthday = older
    }

    return 0;
  });

  // Get display label for relationship
  const getRelationshipLabel = (relationship: string) => {
    if (relationship === 'other') return 'Missionary';
    if (relationship === 'spouse') return 'Spouse';
    if (relationship === 'child') return 'Child';
    return relationship;
  };

  return (
    <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">Family</h2>
      <div className="space-y-3">
        {sortedFamily.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
            <p className="text-sm text-gray-400">{getRelationshipLabel(member.relationship)}</p>
            {member.birthday && (
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <Cake className="h-4 w-4" />
                <span>
                  {formatBirthday(member.birthday)}
                  {member.age && ` (${member.age} years old)`}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
