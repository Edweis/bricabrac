import { useEffect } from 'react';
import { StorageKey, fetch } from '../../storage';

export const useLastEmail = (callback: (email: string) => void) =>
  useEffect(() => {
    const setLastEmail = async () => {
      const lastEmail = await fetch(StorageKey.EMAIL);
      if (lastEmail != null) callback(lastEmail);
    };
    setLastEmail();
  }, []);
