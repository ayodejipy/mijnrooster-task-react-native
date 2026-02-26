import { useState, useEffect, useMemo } from 'react';
import type { Publication } from '../types';

// Seed data — replace the body of fetchPublications() with
// publicationsService.getAll() when the backend is ready.
import ELIJAH_IMAGE from '../../../assets/images/elijah-px.png';
import POST_IMG from '../../../assets/images/first-aid.png';

const SEED_PUBLICATIONS: Publication[] = [
  {
    id: '1',
    tags: ['Covid', 'Vaccine'],
    title: 'Vaccine hesitancy trends',
    description:
      'How do you build stroke risk tools that are both clinically powerful and user-friendly for everyday care?',
    author: 'Elijah Oyindamola',
    authorImage: ELIJAH_IMAGE,
    date: '20 Jan 2022',
    readTime: '3mins',
    imageBg: POST_IMG,
    fallbackBg: '#CBD5E1',
    imageAccent: '#94A3B8',
  },
  {
    id: '2',
    tags: ['Covid', 'Vaccine'],
    title: 'Vaccine hesitancy trends',
    description:
      'How do you build stroke risk tools that are both clinically powerful and user-friendly for everyday care?',
    author: 'Elijah Oyindamola',
    authorImage: ELIJAH_IMAGE,
    date: '20 Jan 2022',
    readTime: '3mins',
    imageBg: POST_IMG,
    fallbackBg: '#9DB4C0',
    imageAccent: '#7B98A8',
  },
  {
    id: '3',
    tags: ['Surgery', 'Research'],
    title: 'Advances in minimally invasive procedures',
    description:
      'New techniques in laparoscopic surgery are reducing recovery time and improving patient outcomes across departments.',
    author: 'Omar Rahman',
    authorImage: 'https://randomuser.me/api/portraits/men/44.jpg',
    date: '14 Mar 2023',
    readTime: '5mins',
    imageBg: POST_IMG,
    fallbackBg: '#C7D2FE',
    imageAccent: '#A5B4FC',
  },
  {
    id: '4',
    tags: ['Mental Health', 'Wellbeing'],
    title: 'Staff burnout in high-pressure medical environments',
    description:
      'A systematic review of burnout indicators among hospital staff and evidence-based interventions that work.',
    author: 'Elijah Oyindamola',
    authorImage: ELIJAH_IMAGE,
    date: '02 Jun 2023',
    readTime: '7mins',
    imageBg: POST_IMG,
    fallbackBg: '#FED7AA',
    imageAccent: '#FDBA74',
  },
];

// Simulated async fetch — swap for publicationsService.getAll() later.
function fetchPublications(): Promise<Publication[]> {
  return new Promise((resolve) => setTimeout(() => resolve(SEED_PUBLICATIONS), 1500));
}

// Module-level cache: survives re-renders and re-mounts (e.g. tab navigation),
// but is cleared when the user explicitly calls refresh().
const cache = new Map<string, Publication[]>();
const CACHE_KEY = 'publications:all';

interface UsePublicationsReturn {
  publications: Publication[];
  query: string;
  isLoading: boolean;
  error: string | null;
  setQuery: (q: string) => void;
  refresh: () => void;
}

export function usePublications(): UsePublicationsReturn {
  const [allPublications, setAllPublications] = useState<Publication[]>(
    cache.get(CACHE_KEY) ?? [],
  );
  // Skip the loading state entirely when there is already cached data.
  const [isLoading, setIsLoading] = useState(!cache.has(CACHE_KEY));
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  // Bumping this number forces a re-fetch and bypasses the cache guard.
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    // Cache hit on first mount — nothing to do.
    if (cache.has(CACHE_KEY) && refreshTick === 0) return;

    setIsLoading(true);
    setError(null);

    fetchPublications()
      .then((data) => {
        cache.set(CACHE_KEY, data);
        setAllPublications(data);
      })
      .catch(() => setError('Failed to load publications. Please try again.'))
      .finally(() => setIsLoading(false));
  }, [refreshTick]);

  const publications = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return allPublications;
    return allPublications.filter(
      (p) =>
        p.title.toLowerCase().includes(trimmed) ||
        p.tags.some((t) => t.toLowerCase().includes(trimmed)) ||
        p.author.toLowerCase().includes(trimmed),
    );
  }, [query, allPublications]);

  return {
    publications,
    query,
    isLoading,
    error,
    setQuery,
    /** Clears the cache and triggers a fresh fetch. */
    refresh: () => {
      cache.delete(CACHE_KEY);
      setRefreshTick((t) => t + 1);
    },
  };
}
