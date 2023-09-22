import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_API_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_API_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_API_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_API_FIREBASE_MSI,
  appId: process.env.NEXT_PUBLIC_API_FIREBASE_APID,
  measurementId: process.env.NEXT_PUBLIC_API_FIREBASE_MSID
};


// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new EmailAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { provider, auth, storage };
export default db;
