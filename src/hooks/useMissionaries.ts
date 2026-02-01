import { useEffect, useState } from 'react';
import { useMissionaryStore } from '@/lib/store/useMissionaryStore';
import { missionaryService } from '@/services';

export function useMissionaries() {
  const { setMissionaries, filteredMissionaries, filters } = useMissionaryStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMissionaries() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await missionaryService.getAll(filters);
        setMissionaries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load missionaries');
      } finally {
        setIsLoading(false);
      }
    }

    loadMissionaries();
  }, []); // Only load on mount, filtering is handled by store

  return { missionaries: filteredMissionaries, isLoading, error };
}
