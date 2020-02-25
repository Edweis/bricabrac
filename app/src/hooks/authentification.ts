import { useEffect, useState } from 'react';
import * as Sentry from 'sentry-expo';
import firebase, { onAuthChange } from '../firebase';
import { StorageKey, store } from '../storage';

export const useFirestoreAuth = () => {
  const [authUser, setAuthUser] = useState<firebase.User | null>();
  useEffect(() => {
    const subscriber = onAuthChange(newUser => {
      if (newUser && newUser.email) store(StorageKey.EMAIL, newUser.email);
      setAuthUser(newUser);
      const emailForSentry =
        newUser && newUser.email ? newUser.email : '(not connected)';
      Sentry.configureScope(scope => scope.setUser({ email: emailForSentry }));
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  return authUser;
};
