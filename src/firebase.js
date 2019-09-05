import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAnI_dsnwoVlGq3CQ4Hb8Wg9iXJCG9vzTI",
    authDomain: "bric-a-brac-fb.firebaseapp.com",
    databaseURL: "https://bric-a-brac-fb.firebaseio.com",
    projectId: "bric-a-brac-fb",
    storageBucket: "",
    messagingSenderId: "53205959987",
    appId: "1:53205959987:web:08b8024d3bbfacda"
});

export {firebaseConfig as firebase}
