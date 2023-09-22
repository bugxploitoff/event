import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCR8K132C36Q-sL6lJ_6eLOjl8BBmrsTeQ",
  authDomain: "events-6470c.firebaseapp.com",
  databaseURL: "https://events-6470c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "events-6470c",
  storageBucket: "events-6470c.appspot.com",
  messagingSenderId: "894616506442",
  appId: "1:894616506442:web:773f5c41f38a8a0b6ed6b3",
  measurementId: "G-BNW3EPGW3F"
};



// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new EmailAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { provider, auth, storage };
export default db;
