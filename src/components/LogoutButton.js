// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from '../firebase';

const styles = StyleSheet.create({ container: { marginRight: 16 } });
export default function LogoutButton() {
  return (
    <View style={styles.container}>
      <Icon
        name="ios-log-out"
        onPress={() => firebase.auth().signOut()}
        type="ionicon"
      />
    </View>
  );
}
