import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC6MX13Y0cpxFX05vL2MSzZbaHqufelkzY",
  authDomain: "crwn-clothing-db-e4562.firebaseapp.com",
  projectId: "crwn-clothing-db-e4562",
  storageBucket: "crwn-clothing-db-e4562.appspot.com",
  messagingSenderId: "1065960959821",
  appId: "1:1065960959821:web:3c2d5008d4a26182f95104",
  measurementId: "G-KJB7WR70MQ",
};

// creates a profile for the current user in the backend (firestore)
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // returns a document/collections reference
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // we obtain a snapshot of the document/collections once we invoke get() on the reference
  const snapShot = await userRef.get();
  const { displayName, email } = userAuth;

  if (!snapShot.exists) {
    const createdAt = new firebase.firestore.Timestamp.now();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  // if a display name hasn't been set for the current user in the database (firestore)
  else if (!snapShot.data().displayName) {
    userRef.update({
      displayName,
    });
  }

  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // this is to create a new collection in firestore
  const collectionRef = firestore.collection(collectionKey);

  // const collectionSs = await collectionRef.get();
  // console.log(collectionSs.docs.map(doc => doc.data()))

  //batch is basically a transaction, it can only run to finish or rollback
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    // asks firestore to return a new document reference
    const newDocRef = collectionRef.doc();
    // adding the action of setting the new document into the collection into the batch job
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
