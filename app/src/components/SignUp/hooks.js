import { useEffect } from 'react';
import { EMAIL_KEY, fetch } from '../../storage';

export const useLastEmail = callback =>
  useEffect(() => {
    const setLastEmail = async () => {
      const lastEmail = await fetch(EMAIL_KEY);
      if (lastEmail != null) callback(lastEmail);
    };
    setLastEmail();
  }, []);
