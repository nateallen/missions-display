'use client';

import { Mail, Phone, MessageSquare, Bell, Facebook, Instagram, Twitter, Youtube, Globe, QrCode } from 'lucide-react';
import { Missionary } from '@/types';
import { useUIStore } from '@/lib/store/useUIStore';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

interface ContactActionsProps {
  missionary: Missionary;
}

export default function ContactActions({ missionary }: ContactActionsProps) {
  const { openSubscribeForm } = useUIStore();
  const [showQR, setShowQR] = useState(false);

  const handleSubscribe = () => {
    openSubscribeForm();
  };

  const contactUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/missionary/${missionary.id}/contact`;

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
        {/* QR Code Section */}
        <div className="rounded-lg bg-gray-700/30 p-4">
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center justify-center gap-3 rounded-lg bg-gray-600 px-6 py-3 text-white font-semibold transition-all hover:bg-gray-500 active:scale-95 touch-manipulation shadow-md hover:shadow-lg w-full"
          >
            <QrCode className="h-5 w-5" />
            {showQR ? 'Hide' : 'Show'} Contact QR Code
          </button>

          {showQR && (
            <div className="mt-4 flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={contactUrl} size={200} level="H" />
              </div>
              <p className="text-sm text-gray-400 mt-3 text-center">
                Scan to view mobile-friendly contact info
              </p>
            </div>
          )}
        </div>

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
          <span className="text-gray-300">{missionary.contact.email}</span>
        </div>

        {missionary.contact.phone && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50">
            <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-300">{missionary.contact.phone}</span>
          </div>
        )}
      </div>

      {/* Social Media */}
      {socialLinks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow on Social Media</h3>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <div
                key={link.label}
                className="flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-gray-300"
              >
                <link.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Links available via QR code</p>
        </div>
      )}
    </div>
  );
}
