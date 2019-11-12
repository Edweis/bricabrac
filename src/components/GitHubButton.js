// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Linking } from 'expo';

const styles = StyleSheet.create({ container: { marginRight: 16 } });
export default function ProjectButton() {
  const onPress = () => {
    Linking.openURL('https://github.com/Edweis/bricabrac/issues');
  };
  return (
    <View style={styles.container}>
      <Icon name="logo-github" onPress={onPress} type="ionicon" />
    </View>
  );
}
