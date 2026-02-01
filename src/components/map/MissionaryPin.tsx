'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Marker } from 'react-simple-maps';
import { Missionary } from '@/types';
import { MAP_CONFIG } from '@/config/map';

interface MissionaryPinProps {
  missionary: Missionary;
  zoom?: number;
}

export default function MissionaryPin({ missionary, zoom = 1 }: MissionaryPinProps) {
  // Calculate inverse scale to keep pin size constant regardless of zoom
  const scale = 1 / zoom;
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    router.push(`/missionary/${missionary.id}`);
  };

  // Get the color for this missionary's region
  const markerColor = MAP_CONFIG.regionColors[missionary.location.regionId] || MAP_CONFIG.markerColor;

  return (
    <>
      <Marker
        coordinates={[
          missionary.location.coordinates.longitude,
          missionary.location.coordinates.latitude,
        ]}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleClick}
      >
        <g transform={`scale(${scale})`}>
          <circle
            r={MAP_CONFIG.markerSize.default}
            fill={markerColor}
            stroke="#fff"
            strokeWidth={2}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="hover:scale-150"
          />
        </g>
      </Marker>

      {showTooltip && (
        <Marker
          coordinates={[
            missionary.location.coordinates.longitude,
            missionary.location.coordinates.latitude,
          ]}
        >
          <g transform={`scale(${scale})`}>
            <foreignObject x={10} y={-50} width={280} height={90}>
              <div
                className="bg-white rounded-lg shadow-xl p-3 border border-gray-300 cursor-pointer"
                onClick={handleClick}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    <img
                      src={missionary.profilePhoto}
                      alt={missionary.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm text-gray-900 leading-tight">
                      {missionary.fullName}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {missionary.location.country}
                    </p>
                  </div>
                </div>
              </div>
            </foreignObject>
          </g>
        </Marker>
      )}
    </>
  );
}
