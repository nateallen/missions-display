'use client';

import { useEffect, useState } from 'react';
import { Geographies, Geography } from 'react-simple-maps';
import { getSubsolarPoint } from '@/utils/solarPosition';

interface DayNightOverlayProps {
  enabled?: boolean;
}

export default function DayNightOverlay({ enabled = true }: DayNightOverlayProps) {
  const [nightGeoJSON, setNightGeoJSON] = useState<any>(null);

  useEffect(() => {
    if (!enabled) return;

    const updateSunPosition = () => {
      const now = new Date();
      const subsolar = getSubsolarPoint(now);

      // Create GeoJSON for the night region
      const geoJSON = createNightGeoJSON(subsolar);
      setNightGeoJSON(geoJSON);
    };

    // Initial calculation
    updateSunPosition();

    // Update every minute
    const interval = setInterval(updateSunPosition, 60000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled || !nightGeoJSON) {
    return null;
  }

  return (
    <Geographies geography={nightGeoJSON}>
      {({ geographies }) =>
        geographies.map((geo) => (
          <Geography
            key="night-overlay"
            geography={geo}
            fill="rgba(0, 0, 60, 0.5)"
            stroke="rgba(100, 150, 255, 0.2)"
            strokeWidth={0.5}
            style={{
              default: { outline: 'none' },
              hover: { outline: 'none', pointerEvents: 'none' },
              pressed: { outline: 'none', pointerEvents: 'none' },
            }}
          />
        ))
      }
    </Geographies>
  );
}

/**
 * Create GeoJSON for the night region
 * The night region is the hemisphere where the sun is below the horizon
 */
function createNightGeoJSON(subsolar: { latitude: number; longitude: number }) {
  // Calculate the anti-solar point (opposite side of Earth from the sun)
  // This is the center of the night hemisphere
  const antiSolar = {
    latitude: -subsolar.latitude,
    longitude: subsolar.longitude > 0 ? subsolar.longitude - 180 : subsolar.longitude + 180,
  };

  // Create the terminator line - the boundary between day and night
  // This is a great circle 90° away from the ANTI-SOLAR point
  const coordinates: number[][] = [];
  const numPoints = 360; // Increased for smoother curve

  for (let i = 0; i <= numPoints; i++) {
    const bearing = (i * 360) / numPoints; // Bearing angle around the anti-solar point
    const bearingRad = (bearing * Math.PI) / 180;

    // Calculate point 90° away from anti-solar point at this bearing
    // Using spherical geometry formulas
    const lat1Rad = (antiSolar.latitude * Math.PI) / 180;
    const lon1Rad = (antiSolar.longitude * Math.PI) / 180;
    const distance = Math.PI / 2; // 90 degrees in radians

    // Calculate latitude of point on terminator
    const lat2 = Math.asin(
      Math.sin(lat1Rad) * Math.cos(distance) +
        Math.cos(lat1Rad) * Math.sin(distance) * Math.cos(bearingRad)
    );

    // Calculate longitude of point on terminator
    const lon2 =
      lon1Rad +
      Math.atan2(
        Math.sin(bearingRad) * Math.sin(distance) * Math.cos(lat1Rad),
        Math.cos(distance) - Math.sin(lat1Rad) * Math.sin(lat2)
      );

    let lonDeg = (lon2 * 180) / Math.PI;
    let latDeg = (lat2 * 180) / Math.PI;

    // Normalize longitude to -180 to 180
    while (lonDeg > 180) lonDeg -= 360;
    while (lonDeg < -180) lonDeg += 360;

    coordinates.push([lonDeg, latDeg]);
  }

  // Determine which pole to use for closing the night polygon
  // Use the pole closer to the anti-solar point (center of night)
  const nightPole = antiSolar.latitude > 0 ? 90 : -90;

  // Create polygon: terminator -> pole -> back to start
  const closedCoords = [...coordinates];
  const lastPoint = coordinates[coordinates.length - 1];

  // Add path to pole and back
  closedCoords.push([lastPoint[0], nightPole]);
  closedCoords.push([coordinates[0][0], nightPole]);
  closedCoords.push(coordinates[0]);

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Night' },
        geometry: {
          type: 'Polygon',
          coordinates: [closedCoords],
        },
      },
    ],
  };
}
