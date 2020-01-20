import { useEffect, useState } from 'react';
import { onAuthChange } from '../firebase';
import { StorageKey, store } from '../storage';

export const useFirestoreAuth = () => {
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    const subscriber = onAuthChange(newUser => {
      if (newUser && newUser.email) store(StorageKey.EMAIL, newUser.email);
      setAuthUser(newUser);
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  return authUser;
};
