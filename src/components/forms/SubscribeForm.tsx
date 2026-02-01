'use client';

import { useState, FormEvent } from 'react';
import { X, Bell, CheckCircle } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import { useMissionaryStore } from '@/lib/store/useMissionaryStore';
import { subscriptionService } from '@/services';

export default function SubscribeForm() {
  const { isSubscribeFormOpen, closeSubscribeForm } = useUIStore();
  const { selectedMissionary } = useMissionaryStore();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState<'email' | 'sms' | 'both'>('email');
  const [frequency, setFrequency] = useState<'immediate' | 'weekly' | 'monthly'>('immediate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!selectedMissionary) {
      setError('No missionary selected');
      setIsSubmitting(false);
      return;
    }

    try {
      await subscriptionService.subscribe({
        email: method === 'email' || method === 'both' ? email : undefined,
        phone: method === 'sms' || method === 'both' ? phone : undefined,
        missionaryIds: [selectedMissionary.id],
        frequency,
        method,
      });

      setSuccess(true);
      setTimeout(() => {
        closeSubscribeForm();
        setSuccess(false);
        setEmail('');
        setPhone('');
      }, 2000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSubscribeFormOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Subscribe to Updates</h2>
          <button
            onClick={closeSubscribeForm}
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
              <h3 className="text-2xl font-bold text-green-600 mb-2">Subscribed!</h3>
              <p className="text-gray-600">You'll receive updates as they're published</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you like to receive updates?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'email' as const, label: 'Email' },
                    { value: 'sms' as const, label: 'SMS' },
                    { value: 'both' as const, label: 'Both' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMethod(option.value)}
                      className={`h-12 rounded-lg font-medium transition-all touch-manipulation ${
                        method === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              {(method === 'email' || method === 'both') && (
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
                    required={method === 'email' || method === 'both'}
                    className="w-full h-14 px-4 text-lg rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all touch-manipulation"
                  />
                </div>
              )}

              {/* Phone Input */}
              {(method === 'sms' || method === 'both') && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={method === 'sms' || method === 'both'}
                    className="w-full h-14 px-4 text-lg rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all touch-manipulation"
                  />
                </div>
              )}

              {/* Frequency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                  className="w-full h-14 px-4 text-lg rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all touch-manipulation"
                >
                  <option value="immediate">Immediately</option>
                  <option value="weekly">Weekly Digest</option>
                  <option value="monthly">Monthly Summary</option>
                </select>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 h-14 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all active:scale-95 touch-manipulation"
              >
                <Bell className="h-5 w-5" />
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
