import React from 'react';
import 'moment/locale/fr';
import {
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import splashBackground from '../../assets/images/splash.png';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: { paddingTop: 30 },
  row: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#AAA',
  },
});

const SplashLoading = () => {
  return (
    <ImageBackground
      source={splashBackground}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <View style={styles.table}>
          <ActivityIndicator size="small" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SplashLoading;
