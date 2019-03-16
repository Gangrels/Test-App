import firebase from 'firebase/app';
import 'firebase/auth';

export const appName = '{YOUR_FIREBASE_APP_NAME}';

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "{YOUR_FIREBASE_API_KEY}",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: `${appName}`,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: `{YOUR_FIREBASE_SENDER_ID}`
  };

  firebase.initializeApp(firebaseConfig);