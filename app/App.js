import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { YellowBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import SplashLoading from './src/screens/Splash';
import ErrorBoundary from './src/screens/Error/ErrorBoundary';
import { IS_DEV } from './src/firebase';

const bootstrap = () => {
  YellowBox.ignoreWarnings([
    'Setting a timer',
    'VirtualizedLists should never be nested',
  ]);
  moment.locale('fr');
  Sentry.init({
    dsn: 'https://f9ed9a0bbc9541a19756b306c3ebb3ac@sentry.io/1853328',
    enableInExpoDevelopment: Constants.manifest.releaseChannel == null,
    debug: IS_DEV,
    environment: IS_DEV ? 'development' : 'prod',
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
    <ErrorBoundary>
      <SplashLoading onError={onError}>
        <AppNavigator />
      </SplashLoading>
    </ErrorBoundary>
  );
}
