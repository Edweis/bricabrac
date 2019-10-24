import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCeDXVDAoDNokR_CzhLIq6N-kQSpkHKHms',
  authDomain: 'bric-a-brac-fb.firebaseapp.com',
  databaseURL: 'https://bric-a-brac-fb.firebaseio.com',
  projectId: 'bric-a-brac-fb',
  storageBucket: 'bric-a-brac-fb.appspot.com',
  messagingSenderId: '53205959987',
  appId: '1:53205959987:web:08b8024d3bbfacda'
});

export async function googleLogin() {
  const config = {
    androidClientId:
      '53205959987-cdkv1nfiseh6odte37uv1k9s9nvr2d9p.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  };
  const { type, accessToken, user } = await Google.logInAsync(config);
  return { type, accessToken, user };
}

export function emailLogin(email: string, password: string) {
  firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function facebookLogin() {
  const appId = '2526563477588546';
  const permissions = ['public_profile', 'email']; // Permissions required, consult Facebook docs

  const resp = await Facebook.logInWithReadPermissionsAsync(appId, {
    permissions
  });
  const { type, token } = resp;

  if (type === 'cancel') return null;
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
  const credential = firebase.auth.FacebookAuthProvider.credential(token);
  const facebookProfileData = await firebase
    .auth()
    .signInWithCredential(credential); // Sign in with Facebook credential

  console.debug('facebookProfileData', { facebookProfileData });
  // Do something with Facebook profile data
  // OR you have subscribed to auth state change, authStateChange handler will process the profile data

  return Promise.resolve({ type: 'success' });
}

export const onAuthChange = action =>
  firebase.auth().onAuthStateChanged(user => action(user));

// export { signInWithFacebook };
export default firebase;
