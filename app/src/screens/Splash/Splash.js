import React, { useState, useCallback } from 'react';
import 'moment/locale/fr';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loadingService } from '../../helpers/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

async function loadResourcesAsync(): Promise<string> {
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
  children: React.Node,
  onError: (error: string) => void,
};
export default ({ children, onError }: Props) => {
  const [isAppLoading, setAppLoading] = useState(true);
  const isStateLoading = loadingService.isLoading();
  const endAppLoading = useCallback(() => setAppLoading(false), []);

  console.debug('isStateLoading', isStateLoading);

  if (isAppLoading || isStateLoading) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={onError}
        onFinish={endAppLoading}
      />
    );
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      {children}
    </View>
  );
};
