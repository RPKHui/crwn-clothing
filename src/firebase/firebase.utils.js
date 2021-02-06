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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return ;

    // a documentReference object that can be used to create, read, update and delete data (CRUD)
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    // a documentSnapshot after getting the data based on the user reference
    const snapShot = await userRef.get();

    // create the data if the snapshot tells us the data doesnt exist
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;