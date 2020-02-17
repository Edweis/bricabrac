/* eslint-disable global-require  */
/* eslint-disable @typescript-eslint/no-var-requires  */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import Constants from 'expo-constants';
import { NavigationProp, RegistrationT } from './constants/types';

let firestoreCredentials;
export const IS_DEV = Constants.manifest.releaseChannel == null;
if (IS_DEV) console.log('Welcome in DEV environment');
else console.log('Welcome in PROD environment');
if (IS_DEV) firestoreCredentials = require('./firestoreCredentialsDev.json');
else firestoreCredentials = require('./firestoreCredentialsProd.json');

firebase.initializeApp(firestoreCredentials);

export function emailLogin(email: string, password: string) {
  try {
    firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    const Sentry = require('sentry-expo');

    Sentry.captureException({ ...err, metadata: 'Failed login' });
  }
}

export const onAuthChange = (action: (user: firebase.User | null) => void) => {
  try {
    firebase.auth().onAuthStateChanged(user => action(user));
  } catch (err) {
    const Sentry = require('sentry-expo');

    Sentry.captureException({ ...err, metadata: 'Failed change Auth' });
  }
};

export const getCurrentUser = () => firebase.auth().currentUser;

export const isUserConnected = () => getCurrentUser() != null;

export const getCurrentUserId = () => {
  const user = getCurrentUser();
  if (user != null) return user.uid;
  throw Error('User is not registered.');
};

export const logout = (navigation: NavigationProp) => {
  try {
    firebase.auth().signOut();
    navigation.popToTop();
  } catch (err) {
    const Sentry = require('sentry-expo');

    Sentry.captureException({ ...err, metadata: 'Failed signout' });
  }
};

export const register = async (registration: RegistrationT) => {
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registration.email,
        registration.password,
      );
  } catch (err) {
    const Sentry = require('sentry-expo');

    Sentry.captureException({
      ...err,
      metadata: `Failed registration for ${registration.email}:${registration.password}`,
    });
  }
};
export const { Timestamp } = firebase.firestore;

export default firebase;
