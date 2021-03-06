import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyADhuv13PGD0rtKivsnd9vUaW2KoX6m_KY",
  authDomain: "crwn-db-1f973.firebaseapp.com",
  databaseURL: "https://crwn-db-1f973.firebaseio.com",
  projectId: "crwn-db-1f973",
  storageBucket: "crwn-db-1f973.appspot.com",
  messagingSenderId: "273514165513",
  appId: "1:273514165513:web:19c125bb4dd37bb6840fd8",
  measurementId: "G-BNEG9YCRC6"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
