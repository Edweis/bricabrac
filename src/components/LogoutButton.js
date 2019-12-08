// @flow
import React from 'react';
import HeaderIconButton from './HeaderIconButton';
import firebase from '../firebase';

export default function LogoutButton() {
  return (
    <HeaderIconButton
      name="ios-log-out"
      onPress={() => firebase.auth().signOut()}
    />
  );
}
