import { useState, useEffect } from 'react';

export function useLocalTime(latitude: number, longitude: number) {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        // Calculate approximate timezone offset from longitude
        // Earth rotates 360° in 24 hours, so 15° of longitude = 1 hour
        const timezoneOffsetHours = Math.round(longitude / 15);

        // Get current UTC time (getTime() already returns UTC milliseconds)
        const now = new Date();
        const utcTime = now.getTime();

        // Calculate local time by adding the offset
        const localDate = new Date(utcTime + (timezoneOffsetHours * 3600000));

        // Format the date and time
        const hours = localDate.getUTCHours();
        const minutes = localDate.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');

        // Get day of week
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[localDate.getUTCDay()];

        setLocalTime(`${dayOfWeek}, ${displayHours}:${displayMinutes} ${ampm}`);
      } catch (error) {
        console.error('Error calculating local time:', error);
        setLocalTime('--:--');
      }
    };

    // Initial update
    updateTime();

    // Update every minute
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [latitude, longitude]);

  return localTime;
}
