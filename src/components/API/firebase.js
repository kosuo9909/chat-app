// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDWaAi3-W8yW9yt2M7Jn2LWCpQva7Nwv4U',

  authDomain: 'chat-app-f21db.firebaseapp.com',

  projectId: 'chat-app-f21db',

  storageBucket: 'chat-app-f21db.appspot.com',

  messagingSenderId: '300585222797',

  appId: '1:300585222797:web:70c0aac4db0b7915e918c4',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
