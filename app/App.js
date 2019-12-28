import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import SignUp from './src/components/SignUp';
import AppNavigator from './src/navigation/AppNavigator';
import SplashLoading, { LoadStoreOnMount } from './src/screens/Splash';
import { onAuthChange, isUserConnected } from './src/firebase';
import { EMAIL_KEY, store } from './src/storage';

const bootstrap = () => {
  console.ignoredYellowBox = ['Setting a timer'];
  moment.locale('fr');
  Sentry.init({
    dsn: 'https://f9ed9a0bbc9541a19756b306c3ebb3ac@sentry.io/1853328',
    enableInExpoDevelopment: true,
    debug: true,
  });
  Sentry.setRelease(Constants.manifest.revisionId);
};

const onError = error => {
  console.warn(error);
  Sentry.captureMessage('Loadings warning', error);
};

export default function App() {
  const [authLoading, setAuthLoading] = useState(isUserConnected());

  useEffect(() => {
    bootstrap();
    const subscriber = onAuthChange(newUser => {
      setAuthLoading(newUser == null);
      // storing last connected user should happen in SignUp component
      // however setting auth loading unmounts it before it can store it.
      if (newUser != null) store(EMAIL_KEY, newUser.email);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (authLoading) return <SignUp />;

  return (
    <SplashLoading onError={onError}>
      <LoadStoreOnMount>
        <AppNavigator />
      </LoadStoreOnMount>
    </SplashLoading>
  );
}
