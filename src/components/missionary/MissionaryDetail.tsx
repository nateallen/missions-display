'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Users, Languages, Church, Cloud, Clock } from 'lucide-react';
import { Missionary, Newsletter } from '@/types';
import { newsletterService } from '@/services';
import { getCountryInfo } from '@/data/countryData';
import { useMissionaryStore } from '@/lib/store/useMissionaryStore';
import { useWeather } from '@/hooks/useWeather';
import { useLocalTime } from '@/hooks/useLocalTime';
import MissionaryBio from './MissionaryBio';
import FamilyInfo from './FamilyInfo';
import NewsletterList from './NewsletterList';
import ContactActions from './ContactActions';

interface MissionaryDetailProps {
  missionary: Missionary;
}

export default function MissionaryDetail({ missionary }: MissionaryDetailProps) {
  const router = useRouter();
  const { clearFilters } = useMissionaryStore();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const countryInfo = getCountryInfo(missionary.location.country);
  const { weather, loading: weatherLoading } = useWeather(
    missionary.location.coordinates.latitude,
    missionary.location.coordinates.longitude
  );
  const localTime = useLocalTime(
    missionary.location.coordinates.latitude,
    missionary.location.coordinates.longitude
  );

  const handleBack = () => {
    clearFilters();
    router.push('/');
  };

  useEffect(() => {
    async function loadNewsletters() {
      try {
        const data = await newsletterService.getByMissionary(missionary.id);
        setNewsletters(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load newsletters:', error);
      } finally {
        setLoading(false);
      }
    }

    loadNewsletters();
  }, [missionary.id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header with Country Background */}
      <div className="relative h-[600px] md:h-[650px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${countryInfo.backgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-4 py-3 font-semibold text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-105 active:scale-95 touch-manipulation z-10"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Map
        </button>

        {/* Country Flag - Small, Top Right */}
        <div className="absolute top-4 right-4 text-6xl drop-shadow-lg">
          {countryInfo.flag}
        </div>

        {/* Missionary Photo and Info */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          {/* Photo */}
          <div className="relative mb-6">
            <button
              onClick={() => setIsPhotoModalOpen(true)}
              className="w-[22rem] h-64 md:w-[28rem] md:h-80 rounded-lg bg-white/30 p-1 shadow-2xl hover:bg-white/40 transition-colors cursor-pointer"
              aria-label="View full size photo"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={missionary.profilePhoto}
                  alt={missionary.fullName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </button>
          </div>

          {/* Name and Location */}
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {missionary.fullName}
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/90 text-lg md:text-xl mb-8">
              <MapPin className="h-5 w-5" />
              <span>
                {missionary.location.city && `${missionary.location.city}, `}
                {missionary.location.country}
              </span>
              <span className="mx-2">•</span>
              <Clock className="h-5 w-5" />
              <span>
                {localTime || 'Loading...'}
              </span>
            </div>

            {/* Country Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Users className="h-5 w-5 text-white/80 mx-auto mb-1" />
                <p className="text-xs text-white/70">Population</p>
                <p className="text-sm font-semibold text-white">{countryInfo.population}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Languages className="h-5 w-5 text-white/80 mx-auto mb-1" />
                <p className="text-xs text-white/70">Language</p>
                <p className="text-sm font-semibold text-white">{countryInfo.language}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Church className="h-5 w-5 text-white/80 mx-auto mb-1" />
                <p className="text-xs text-white/70">Religion</p>
                <p className="text-sm font-semibold text-white">{countryInfo.religion}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Cloud className="h-5 w-5 text-white/80 mx-auto mb-1" />
                {weatherLoading ? (
                  <div className="text-center">
                    <p className="text-xs text-white/70">Weather</p>
                    <p className="text-sm font-semibold text-white">Loading...</p>
                  </div>
                ) : weather ? (
                  <div className="text-center">
                    <p className="text-xs text-white/60 capitalize">{weather.description}</p>
                    <p className="text-sm font-semibold text-white">{weather.temp}°F</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-xs text-white/70">Weather</p>
                    <p className="text-sm text-white/60">N/A</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <MissionaryBio missionary={missionary} />
            {!loading && <NewsletterList newsletters={newsletters} />}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <ContactActions missionary={missionary} />
            <FamilyInfo family={missionary.family} />
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {isPhotoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm p-3 text-gray-900 shadow-lg hover:bg-white transition-all z-10"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={missionary.profilePhoto}
                alt={missionary.fullName}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
