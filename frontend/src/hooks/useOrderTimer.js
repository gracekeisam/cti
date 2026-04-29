import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that returns a live-updating string showing
 * elapsed time since a given ISO timestamp.
 * Updates every second for times < 1 hour, every minute after.
 */
export function useOrderTimer(timestamp) {
  const formatElapsed = useCallback(() => {
    if (!timestamp) return '';
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

    if (seconds < 0) return 'Just now';
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      const secs = seconds % 60;
      return `${minutes}m ${secs}s`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }, [timestamp]);

  const [elapsed, setElapsed] = useState(formatElapsed);

  useEffect(() => {
    if (!timestamp) return;

    setElapsed(formatElapsed());

    const interval = setInterval(() => {
      setElapsed(formatElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp, formatElapsed]);

  return elapsed;
}
