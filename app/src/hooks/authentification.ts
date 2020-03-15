import { useEffect, useState } from 'react';
import * as Sentry from 'sentry-expo';
import firebase, { onAuthChange, getCurrentUser } from '../firebase';
import { StorageKey, store } from '../storage';

export const useFirestoreAuth = () => {
  const [authUser, setAuthUser] = useState<firebase.User | null>(() =>
    getCurrentUser(),
  );
  useEffect(() => {
    const subscriber = onAuthChange(newUser => {
      if (newUser && newUser.email) store(StorageKey.EMAIL, newUser.email);
      setAuthUser(newUser);
      const emailForSentry =
        newUser && newUser.email ? newUser.email : '(not connected)';
      if (Sentry) {
        // this extra check to avoid sentry error. issue :https://github.com/expo/sentry-expo/issues/56#issuecomment-599165334 sentry:https://sentry.io/organizations/kapochamo/issues/1519299952/?project=1853328&query=is%3Aunresolved
        Sentry.configureScope(scope =>
          scope.setUser({ email: emailForSentry }),
        );
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  return authUser;
};
