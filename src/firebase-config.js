import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFPUDvghlrIsgs8rxaaCeo81O6CkX-VZw",
  authDomain: "e-commerce-9c456.firebaseapp.com",
  projectId: "e-commerce-9c456",
  storageBucket: "e-commerce-9c456.appspot.com",
  messagingSenderId: "244986874520",
  appId: "1:244986874520:web:85bf190c71f0ddb9c69eed",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
