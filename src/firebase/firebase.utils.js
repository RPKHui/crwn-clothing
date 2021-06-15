import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC6MX13Y0cpxFX05vL2MSzZbaHqufelkzY",
    authDomain: "crwn-clothing-db-e4562.firebaseapp.com",
    projectId: "crwn-clothing-db-e4562",
    storageBucket: "crwn-clothing-db-e4562.appspot.com",
    messagingSenderId: "1065960959821",
    appId: "1:1065960959821:web:3c2d5008d4a26182f95104",
    measurementId: "G-KJB7WR70MQ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;