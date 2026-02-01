'use client';

import { Mail, Phone, MessageSquare, Bell, Facebook, Instagram, Twitter, Youtube, Globe } from 'lucide-react';
import { Missionary } from '@/types';
import { useUIStore } from '@/lib/store/useUIStore';

interface ContactActionsProps {
  missionary: Missionary;
}

export default function ContactActions({ missionary }: ContactActionsProps) {
  const { openEmailForm, openSubscribeForm } = useUIStore();

  const handleEmail = () => {
    openEmailForm();
  };

  const handleSubscribe = () => {
    openSubscribeForm();
  };

  const socialLinks = [
    { icon: Facebook, url: missionary.socialMedia.facebook, label: 'Facebook' },
    { icon: Instagram, url: missionary.socialMedia.instagram, label: 'Instagram' },
    { icon: Twitter, url: missionary.socialMedia.twitter, label: 'Twitter' },
    { icon: Youtube, url: missionary.socialMedia.youtube, label: 'YouTube' },
    { icon: Globe, url: missionary.socialMedia.blog, label: 'Blog' },
  ].filter((link) => link.url);

  return (
    <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>

      {/* Primary Actions */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <button
          onClick={handleEmail}
          className="flex items-center justify-center gap-3 rounded-lg bg-gray-600 px-6 py-4 text-white font-semibold transition-all hover:bg-gray-500 active:scale-95 touch-manipulation shadow-md hover:shadow-lg"
        >
          <Mail className="h-5 w-5" />
          Send Email
        </button>

        <button
          onClick={handleSubscribe}
          className="flex items-center justify-center gap-3 rounded-lg bg-gray-600 px-6 py-4 text-white font-semibold transition-all hover:bg-gray-500 active:scale-95 touch-manipulation shadow-md hover:shadow-lg"
        >
          <Bell className="h-5 w-5" />
          Subscribe to Updates
        </button>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50">
          <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <a
            href={`mailto:${missionary.contact.email}`}
            className="text-gray-300 hover:text-white hover:underline break-all"
          >
            {missionary.contact.email}
          </a>
        </div>

        {missionary.contact.phone && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50">
            <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <a
              href={`tel:${missionary.contact.phone}`}
              className="text-gray-300 hover:text-white hover:underline"
            >
              {missionary.contact.phone}
            </a>
          </div>
        )}
      </div>

      {/* Social Media */}
      {socialLinks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow on Social Media</h3>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors touch-manipulation active:scale-95"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
