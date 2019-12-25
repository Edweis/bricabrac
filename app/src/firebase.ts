/* eslint-disable global-require */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import Constants from 'expo-constants';

let firestoreCredentials;
export const IS_DEV = Constants.manifest.releaseChannel == null;
if (IS_DEV) console.log('Welcome in DEV environment');
else console.log('Welcome in PROD environment');
if (IS_DEV) firestoreCredentials = require('./firestoreCredentialsDev.json');
else firestoreCredentials = require('./firestoreCredentialsProd.json');

firebase.initializeApp(firestoreCredentials);

export async function googleLogin() {
  const config = {
    androidClientId:
      '53205959987-cdkv1nfiseh6odte37uv1k9s9nvr2d9p.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    clientId: 'xxx',
  };
  const { type } = await Google.logInAsync(config);
  return { type };
}

export function emailLogin(email: string, password: string) {
  firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function facebookLogin() {
  const appId = '2526563477588546';
  const permissions = ['public_profile', 'email']; // Permissions required, consult Facebook docs

  const resp = await Facebook.logInWithReadPermissionsAsync(appId, {
    permissions,
  });
  const { type, token } = resp;

  if (type === 'cancel') return null;
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
  const credential = firebase.auth.FacebookAuthProvider.credential(token || '');
  const facebookProfileData = await firebase
    .auth()
    .signInWithCredential(credential); // Sign in with Facebook credential

  console.log('facebookProfileData', { facebookProfileData });
  // Do something with Facebook profile data
  // OR you have subscribed to auth state change, authStateChange handler will process the profile data

  return Promise.resolve({ type: 'success' });
}

export const isUserConnected = () => {
  return firebase.auth().currentUser != null;
};

export const onAuthChange = (action: (value: any) => void) =>
  firebase.auth().onAuthStateChanged(user => action(user));

export const getCurrentUser = () => firebase.auth().currentUser;

export const getCurrentUserId = () => {
  const user = getCurrentUser();
  if (user != null) return user.uid;
  return null;
};

export default firebase;
