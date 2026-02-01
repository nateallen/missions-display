/**
 * Calculate the sun's position (subsolar point) for a given date/time
 * Based on simplified solar position algorithms
 */

interface SolarPosition {
  latitude: number;
  longitude: number;
}

/**
 * Calculate the subsolar point - where the sun is directly overhead
 */
export function getSubsolarPoint(date: Date = new Date()): SolarPosition {
  // Julian day calculation
  const jd = getJulianDay(date);
  const n = jd - 2451545.0;

  // Mean longitude of the sun
  const L = (280.460 + 0.9856474 * n) % 360;

  // Mean anomaly
  const g = (357.528 + 0.9856003 * n) % 360;
  const gRad = (g * Math.PI) / 180;

  // Ecliptic longitude
  const lambda = L + 1.915 * Math.sin(gRad) + 0.020 * Math.sin(2 * gRad);
  const lambdaRad = (lambda * Math.PI) / 180;

  // Obliquity of the ecliptic
  const epsilon = 23.439 - 0.0000004 * n;
  const epsilonRad = (epsilon * Math.PI) / 180;

  // Declination (latitude where sun is overhead)
  const declination = Math.asin(Math.sin(epsilonRad) * Math.sin(lambdaRad));
  const latitude = (declination * 180) / Math.PI;

  // Right ascension
  const ra =
    Math.atan2(Math.cos(epsilonRad) * Math.sin(lambdaRad), Math.cos(lambdaRad)) *
    (180 / Math.PI);

  // Greenwich Mean Sidereal Time
  const utcHours =
    date.getUTCHours() +
    date.getUTCMinutes() / 60 +
    date.getUTCSeconds() / 3600;
  // Corrected GMST formula: use 0.9856474 degrees per day, not 360.9856474
  const gmst = (280.460 + 0.9856474 * n + 15 * utcHours) % 360;

  // Longitude (where sun is overhead)
  // The sun's longitude is where local solar time = 12:00
  let longitude = ra - gmst;

  // Normalize to -180 to 180
  while (longitude > 180) longitude -= 360;
  while (longitude < -180) longitude += 360;

  return { latitude, longitude };
}

/**
 * Calculate Julian Day from a JavaScript Date
 */
function getJulianDay(date: Date): number {
  const a = Math.floor((14 - (date.getUTCMonth() + 1)) / 12);
  const y = date.getUTCFullYear() + 4800 - a;
  const m = date.getUTCMonth() + 1 + 12 * a - 3;

  let jdn =
    date.getUTCDate() +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  const jd =
    jdn +
    (date.getUTCHours() - 12) / 24 +
    date.getUTCMinutes() / 1440 +
    date.getUTCSeconds() / 86400;

  return jd;
}

/**
 * Generate coordinates for the night shadow polygon
 * Returns an array of [longitude, latitude] pairs forming a polygon
 */
export function getNightShadowCoordinates(date: Date = new Date()): number[][] {
  const subsolar = getSubsolarPoint(date);

  // Create a circle of 90° radius centered on the subsolar point
  // This represents the terminator line (day/night boundary)
  const coordinates: number[][] = [];
  const numPoints = 180; // More points = smoother curve

  for (let i = 0; i <= numPoints; i++) {
    const angle = (i * 360) / numPoints;
    const angleRad = (angle * Math.PI) / 180;

    // Calculate point on circle 90° away from subsolar point
    const lat = Math.asin(
      Math.sin((subsolar.latitude * Math.PI) / 180) * Math.cos(Math.PI / 2) +
        Math.cos((subsolar.latitude * Math.PI) / 180) *
          Math.sin(Math.PI / 2) *
          Math.cos(angleRad)
    );

    const lon =
      (subsolar.longitude * Math.PI) / 180 +
      Math.atan2(
        Math.sin(angleRad) *
          Math.sin(Math.PI / 2) *
          Math.cos((subsolar.latitude * Math.PI) / 180),
        Math.cos(Math.PI / 2) -
          Math.sin((subsolar.latitude * Math.PI) / 180) * Math.sin(lat)
      );

    coordinates.push([(lon * 180) / Math.PI, (lat * 180) / Math.PI]);
  }

  return coordinates;
}
