import { useEffect, useState, useCallback } from 'react';
import { StorageKey, fetch } from '../../../storage';

export const useLastEmail = (callback: (email: string) => void) =>
  useEffect(() => {
    // avoid to update unmounted component
    let isCancel = false;
    const setLastEmail = async () => {
      const lastEmail = await fetch(StorageKey.EMAIL);
      if (lastEmail != null && !isCancel) callback(lastEmail);
    };
    setLastEmail();
    return () => {
      isCancel = true;
    };
  }, []);

export const useErrorHandler = (
  resetDeps: React.DependencyList,
): [string | null, (error: any) => void] => {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error != null) setError(null);
  }, resetDeps);
  const catchError = useCallback(
    (err: any) => setError(err && err.message),
    [],
  );
  return [error, catchError];
};
