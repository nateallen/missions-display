'use client';

import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { useMapStore } from '@/lib/store/useMapStore';
import { useMissionaryStore } from '@/lib/store/useMissionaryStore';
import { MAP_CONFIG, getRegionFromCountry, getRegionCenter } from '@/config/map';
import { mockRegions } from '@/data/mock';
import MissionaryPin from './MissionaryPin';
import RegionOverlay from './RegionOverlay';
import MapControls from './MapControls';

const geoUrl = '/maps/world-110m.json';

export default function WorldMap() {
  const { zoom, center, selectedRegion, setZoom, setCenter, setSelectedRegion } = useMapStore();
  const { filteredMissionaries, setFilters } = useMissionaryStore();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredMissionaryId, setHoveredMissionaryId] = useState<string | null>(null);

  const handleGeographyClick = (geo: any) => {
    const countryName = geo.properties.name;
    const regionCode = getRegionFromCountry(countryName);

    // If no region selected, select the region (continent level)
    if (!selectedRegion && regionCode) {
      const region = mockRegions.find((r) => r.code === regionCode);
      if (region) {
        setSelectedRegion(region);
        setFilters({ regionId: regionCode });
        const regionCenter = getRegionCenter(regionCode);
        setCenter(regionCenter);
        setZoom(1.5); // Reduced zoom to keep entire region visible
      }
    }
    // If region already selected, filter by country
    else if (selectedRegion && regionCode === selectedRegion.code) {
      setSelectedCountry(countryName);
      setFilters({ regionId: regionCode, country: countryName });
      // Zoom to country
      setZoom(4);
    }
  };

  useEffect(() => {
    if (!selectedRegion) {
      setFilters({});
      setSelectedCountry(null);
    }
  }, [selectedRegion, setFilters]);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-gray-800 to-gray-900">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={MAP_CONFIG.projectionConfig}
        width={MAP_CONFIG.width}
        height={MAP_CONFIG.height}
        className="h-full w-full"
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={({ coordinates, zoom: newZoom }) => {
            setCenter(coordinates as [number, number]);
            setZoom(newZoom);
          }}
          minZoom={MAP_CONFIG.minZoom}
          maxZoom={MAP_CONFIG.maxZoom}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;

                // Calculate proper centroid for special cases (like French Guiana)
                const centroid = geoCentroid(geo);

                const regionCode = getRegionFromCountry(
                  countryName,
                  centroid as [number, number]
                );

                // Debug: Log unmapped countries
                if (!regionCode) {
                  console.log('Unmapped country:', countryName);
                }

                const isRegionSelected = selectedRegion && regionCode === selectedRegion.code;
                const isCountrySelected = selectedCountry === countryName;

                // When no region is selected, highlight entire continent on hover
                // When region is selected, highlight individual country on hover
                const isHovered = selectedRegion
                  ? hoveredCountry === countryName
                  : hoveredRegion === regionCode && regionCode !== null;

                let fillColor = MAP_CONFIG.defaultFill;
                if (isCountrySelected && regionCode) {
                  fillColor = MAP_CONFIG.selectedFill;
                } else if (isRegionSelected && regionCode) {
                  fillColor = MAP_CONFIG.selectedFill;
                } else if (isHovered) {
                  fillColor = MAP_CONFIG.hoverFill;
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', cursor: 'pointer' },
                      pressed: { outline: 'none' },
                    }}
                    onClick={() => handleGeographyClick(geo)}
                    onMouseEnter={() => {
                      if (selectedRegion) {
                        setHoveredCountry(countryName);
                      } else {
                        setHoveredRegion(regionCode);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredCountry(null);
                      setHoveredRegion(null);
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Render all pins first */}
          {filteredMissionaries.map((missionary) => (
            <MissionaryPin
              key={missionary.id}
              missionary={missionary}
              zoom={zoom}
              showPinOnly={true}
              onMouseEnter={() => {
                setHoveredMissionaryId(missionary.id);
                setHoveredRegion(missionary.location.regionId);
              }}
              onMouseLeave={() => {
                setHoveredMissionaryId(null);
                setHoveredRegion(null);
              }}
            />
          ))}

          {/* Then render all tooltips on top */}
          {filteredMissionaries.map((missionary) => (
            <MissionaryPin
              key={`tooltip-${missionary.id}`}
              missionary={missionary}
              zoom={zoom}
              showPinOnly={false}
              showTooltip={hoveredMissionaryId === missionary.id}
              onMouseEnter={() => {
                setHoveredMissionaryId(missionary.id);
                setHoveredRegion(missionary.location.regionId);
              }}
              onMouseLeave={() => {
                setHoveredMissionaryId(null);
                setHoveredRegion(null);
              }}
            />
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {selectedRegion && <RegionOverlay region={selectedRegion} />}
      <MapControls />
    </div>
  );
}
