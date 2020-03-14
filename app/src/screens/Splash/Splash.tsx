import React, { useState, useCallback } from 'react';
import 'moment/locale/fr';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFirestoreLoading } from './helpers';
import SplashLoading from './SplashLoading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

async function loadResourcesAsync(): Promise<void> {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      /* eslint-disable-next-line global-require */
      'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

type Props = {
  children: JSX.Element;
  onError: (error: Error) => void;
};
export default ({ children, onError }: Props) => {
  const [isAppLoading, setAppLoading] = useState(true);
  const isFirestoreLoading = useFirestoreLoading();
  const endAppLoading = useCallback(() => setAppLoading(false), []);

  if (isAppLoading) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={onError}
        onFinish={endAppLoading}
      />
    );
  }

  if (isFirestoreLoading) return <SplashLoading />;

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      {children}
    </View>
  );
};
