import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import SignUp from './src/components/SignUp';
import AppNavigator from './src/navigation/AppNavigator';
import { onAuthChange, isUserConnected } from './src/firebase';
import useGlobalProvider from './src/hooks/globalProvider';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

export default function App() {
  const [isAppLoading, setAppLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(isUserConnected());
  const endAppLoading = useCallback(() => setAppLoading(false), []);

  const GlobalProvider = useGlobalProvider();

  useEffect(() => {
    bootstrap();
    const subscriber = onAuthChange(newUser => {
      setAuthLoading(newUser == null);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isAppLoading) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={endAppLoading}
      />
    );
  }

  if (authLoading) return <SignUp />;

  return (
    <GlobalProvider>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </GlobalProvider>
  );
}
