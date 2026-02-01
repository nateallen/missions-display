'use client';

import { useParams } from 'next/navigation';
import { useMissionaries } from '@/hooks/useMissionaries';
import Image from 'next/image';
import { Mail, Phone, Cake, Users, Facebook, Instagram, Twitter, Youtube, Globe, Download } from 'lucide-react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Missionary } from '@/types';

function generateVCard(missionary: Missionary): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${missionary.fullName}`,
    `N:${missionary.lastName};${missionary.firstName};;;`,
    `EMAIL:${missionary.contact.email}`,
  ];

  if (missionary.contact.phone) {
    vcard.push(`TEL:${missionary.contact.phone}`);
  }

  vcard.push(`ORG:Lighthouse Baptist Church`);
  vcard.push(`TITLE:Missionary`);

  // Add photo URL
  const photoUrl = missionary.profilePhoto.startsWith('http')
    ? missionary.profilePhoto
    : `${window.location.origin}${missionary.profilePhoto}`;
  vcard.push(`PHOTO;VALUE=URL:${photoUrl}`);

  vcard.push(`NOTE:${missionary.bio.replace(/\n/g, '\\n')}`);

  // Add family birthdays as X- properties
  if (missionary.family && missionary.family.length > 0) {
    missionary.family
      .filter(member => member.birthday)
      .forEach(member => {
        const date = new Date(member.birthday!);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        vcard.push(`X-ANNIVERSARY;TYPE=${member.relationship.toUpperCase()};X-LABEL=${member.name} Birthday:${formattedDate}`);
      });
  }

  // Add all social media URLs
  if (missionary.socialMedia.blog) {
    vcard.push(`URL:${missionary.socialMedia.blog}`);
  }
  if (missionary.socialMedia.facebook) {
    vcard.push(`URL:${missionary.socialMedia.facebook}`);
  }
  if (missionary.socialMedia.instagram) {
    vcard.push(`URL:${missionary.socialMedia.instagram}`);
  }
  if (missionary.socialMedia.twitter) {
    vcard.push(`URL:${missionary.socialMedia.twitter}`);
  }
  if (missionary.socialMedia.youtube) {
    vcard.push(`URL:${missionary.socialMedia.youtube}`);
  }

  vcard.push('END:VCARD');
  return vcard.join('\n');
}

export default function MissionaryContactPage() {
  const params = useParams();
  const { missionaries, isLoading } = useMissionaries();

  const missionary = missionaries.find((m) => m.id === params.id);

  const handleDownloadContact = () => {
    if (!missionary) return;

    const vcard = generateVCard(missionary);
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${missionary.fullName.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (!missionary) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Missionary Not Found</h1>
          <p className="text-gray-400">The missionary you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  const socialLinks = [
    { icon: Facebook, url: missionary.socialMedia.facebook, label: 'Facebook' },
    { icon: Instagram, url: missionary.socialMedia.instagram, label: 'Instagram' },
    { icon: Twitter, url: missionary.socialMedia.twitter, label: 'Twitter' },
    { icon: Youtube, url: missionary.socialMedia.youtube, label: 'YouTube' },
    { icon: Globe, url: missionary.socialMedia.blog, label: 'Blog' },
  ].filter((link) => link.url);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          {/* Profile Photo */}
          <div className="mb-4 flex justify-center">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-xl">
              <Image
                src={missionary.profilePhoto}
                alt={missionary.fullName}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">{missionary.fullName}</h1>
          <p className="text-lg text-gray-300">Missionary</p>
          <p className="text-sm text-gray-400 mt-1">
            {missionary.location.city}, {missionary.location.country}
          </p>

          {/* Download Contact Button */}
          <button
            onClick={handleDownloadContact}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
          >
            <Download className="h-5 w-5" />
            Save to Contacts
          </button>
        </div>

        {/* Contact Information */}
        <div className="mb-6 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </h2>

          <div className="space-y-3">
            <a
              href={`mailto:${missionary.contact.email}`}
              className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors active:scale-98"
            >
              <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
              <span className="text-white break-all">{missionary.contact.email}</span>
            </a>

            {missionary.contact.phone && (
              <a
                href={`tel:${missionary.contact.phone}`}
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors active:scale-98"
              >
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-white">{missionary.contact.phone}</span>
              </a>
            )}

            {missionary.socialMedia.blog && (
              <a
                href={missionary.socialMedia.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors active:scale-98"
              >
                <Globe className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-white break-all">{missionary.socialMedia.blog}</span>
              </a>
            )}
          </div>
        </div>

        {/* Family Information */}
        {missionary.family && missionary.family.length > 0 && (
          <div className="mb-6 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Family
            </h2>

            <div className="space-y-3">
              {missionary.family.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50"
                >
                  <div>
                    <p className="font-semibold text-white">{member.name}</p>
                    <p className="text-sm text-gray-400 capitalize">{member.relationship}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Cake className="h-4 w-4" />
                    <span className="text-sm">
                      {member.birthday.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Media */}
        {socialLinks.length > 0 && (
          <div className="rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Follow on Social Media</h2>

            <div className="grid grid-cols-1 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors active:scale-98"
                >
                  <link.icon className="h-5 w-5 text-gray-300 flex-shrink-0" />
                  <span className="font-medium text-white">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Lighthouse Baptist Church Missionaries</p>
        </div>
      </div>
    </div>
  );
}
