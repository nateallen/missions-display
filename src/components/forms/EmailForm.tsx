'use client';

import { useState, FormEvent } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import { emailService } from '@/services';

export default function EmailForm() {
  const { isEmailFormOpen, closeEmailForm, currentNewsletterTitle } = useUIStore();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await emailService.sendNewsletter({
        to: email,
        from: 'missions@church.org',
        subject: currentNewsletterTitle || 'Missionary Newsletter',
        body: 'See attached newsletter',
        type: 'newsletter',
      });

      setSuccess(true);
      setTimeout(() => {
        closeEmailForm();
        setSuccess(false);
        setEmail('');
      }, 2000);
    } catch (err) {
      setError('Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isEmailFormOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Email Newsletter</h2>
          <button
            onClick={closeEmailForm}
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-600 mb-2">Sent!</h3>
              <p className="text-gray-600">Check your email inbox</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-14 px-4 text-lg rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all touch-manipulation"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 h-14 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all active:scale-95 touch-manipulation"
              >
                <Mail className="h-5 w-5" />
                {isSubmitting ? 'Sending...' : 'Send Email'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
