import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import AppNavigator from './src/navigation/AppNavigator';
import SplashLoading from './src/screens/Splash';

const bootstrap = () => {
  console.ignoredYellowBox = [
    'Setting a timer',
    'VirtualizedLists should never',
  ];
  moment.locale('fr');
  Sentry.init({
    dsn: 'https://f9ed9a0bbc9541a19756b306c3ebb3ac@sentry.io/1853328',
    enableInExpoDevelopment: Constants.manifest.releaseChannel == null,
    debug: Constants.manifest.releaseChannel == null,
  });
  Sentry.setRelease(Constants.manifest.revisionId);
};

const onError = error => {
  console.warn(error);
  Sentry.captureMessage('Loadings warning', error);
};

export default function App() {
  useEffect(() => {
    bootstrap();
  }, []);

  console.debug('rendering App');

  return (
    <SplashLoading onError={onError}>
      <AppNavigator />
    </SplashLoading>
  );
}
