import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCR8K132C36Q-sL6lJ_6eLOjl8BBmrsTeQ",
  authDomain: "events-6470c.firebaseapp.com",
  projectId: "events-6470c",
  storageBucket: "events-6470c.appspot.com",
  messagingSenderId: "894616506442",
  appId: "1:894616506442:web:c8cd841c36b11be36ed6b3",
  measurementId: "G-D4795VT3GR"
};


// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new EmailAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { provider, auth, storage };
export default db;
