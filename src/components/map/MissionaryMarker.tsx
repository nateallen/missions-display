'use client';

import { Marker } from 'react-simple-maps';
import { Missionary } from '@/types';
import { MAP_CONFIG } from '@/config/map';
import { useMissionaryStore } from '@/lib/store/useMissionaryStore';

interface MissionaryMarkerProps {
  missionary: Missionary;
}

export default function MissionaryMarker({ missionary }: MissionaryMarkerProps) {
  const { selectedMissionary, setSelectedMissionary } = useMissionaryStore();
  const isSelected = selectedMissionary?.id === missionary.id;

  return (
    <Marker
      coordinates={[missionary.location.coordinates.longitude, missionary.location.coordinates.latitude]}
      onClick={() => setSelectedMissionary(missionary)}
    >
      <circle
        r={isSelected ? MAP_CONFIG.markerSize.selected : MAP_CONFIG.markerSize.default}
        fill={isSelected ? MAP_CONFIG.markerHoverColor : MAP_CONFIG.markerColor}
        stroke="#fff"
        strokeWidth={2}
        style={{
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        className="hover:scale-125"
      />
      {isSelected && (
        <text
          textAnchor="middle"
          y={-15}
          style={{
            fontFamily: 'system-ui',
            fontSize: '12px',
            fill: '#1F2937',
            fontWeight: 'bold',
            pointerEvents: 'none',
          }}
        >
          {missionary.fullName}
        </text>
      )}
    </Marker>
  );
}
