import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
};

export const usePlatform = () => {
  const [platform, setPlatform] = useState('unknown');
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) setPlatform('mac');
    else if (ua.includes('win')) setPlatform('windows');
  }, []);
  return platform;
};
