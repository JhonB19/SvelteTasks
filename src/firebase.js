import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDCTBerGcS-dEmOl2UvCyrVQuNgG78aByE",
    authDomain: "crud-svelte-68d36.firebaseapp.com",
    projectId: "crud-svelte-68d36",
    storageBucket: "crud-svelte-68d36.appspot.com",
    messagingSenderId: "95185711156",
    appId: "1:95185711156:web:13d297bf5ee34eee8dda61"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
