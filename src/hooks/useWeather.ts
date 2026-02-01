import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  main: string; // Clear, Clouds, Rain, etc.
}

export function useWeather(latitude: number, longitude: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!apiKey) {
      console.error('Weather API key not configured');
      setError('Weather API key not configured');
      setLoading(false);
      return;
    }

    async function fetchWeather() {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
        console.log('Fetching weather for coordinates:', { latitude, longitude });

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Weather API HTTP error:', response.status, errorData);
          throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch weather data`);
        }

        const data = await response.json();

        // Log error response if API returned an error
        if (data.cod && data.cod !== 200) {
          console.error('Weather API error:', data.message || data);
          throw new Error(data.message || 'Weather API error');
        }

        setWeather({
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          main: data.weather[0].main,
        });
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unable to load weather';
        setError(errorMessage);
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [latitude, longitude]);

  return { weather, loading, error };
}
