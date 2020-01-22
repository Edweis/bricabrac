import { useEffect } from 'react';
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
