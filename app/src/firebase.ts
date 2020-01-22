/* eslint-disable global-require */
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
  firebase.auth().signInWithEmailAndPassword(email, password);
}

export const onAuthChange = (action: (user: firebase.User | null) => void) =>
  firebase.auth().onAuthStateChanged(user => action(user));

export const getCurrentUser = () => firebase.auth().currentUser;

export const isUserConnected = () => getCurrentUser() != null;

export const getCurrentUserId = () => {
  const user = getCurrentUser();
  if (user != null) return user.uid;
  throw Error('User is not registered.');
};

export const logout = (navigation: NavigationProp) => {
  firebase.auth().signOut();
  navigation.popToTop();
};

export const register = async (registration: RegistrationT) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(registration.email, registration.password);
};
export const { Timestamp } = firebase.firestore;

export default firebase;
