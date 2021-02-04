import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAPqbZLguuwRyA5AGbt096H52Jz55jCNYE",
    authDomain: "crwn-db-39c18.firebaseapp.com",
    projectId: "crwn-db-39c18",
    storageBucket: "crwn-db-39c18.appspot.com",
    messagingSenderId: "177817901064",
    appId: "1:177817901064:web:62afc912c7ead899ce59bd",
    measurementId: "G-492TC75K5X"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;