import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { LoginData, RegisterData } from './app/types';

const firebaseConfig = {
  apiKey: 'AIzaSyAsWKYLAMEyk2EHfvRxQ9Oft0Si_yNBHYo',
  authDomain: 'graphiql-app-3d55f.firebaseapp.com',
  projectId: 'graphiql-app-3d55f',
  storageBucket: 'graphiql-app-3d55f.appspot.com',
  messagingSenderId: '804299002995',
  appId: '1:804299002995:web:6df6a697e48b9319e0c606',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async ({ email, password }: LoginData) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async ({ name, email, password }: RegisterData) => {
  console.log(name, email, password)
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    authProvider: 'local',
    email,
  });
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
