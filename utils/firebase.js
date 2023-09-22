import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHhmCVvds9uSjxnN4tnr2P4Cs2-9MEdKc",
  authDomain: "events-73685.firebaseapp.com",
  projectId: "events-73685",
  storageBucket: "events-73685.appspot.com",
  messagingSenderId: "497755844972",
  appId: "1:497755844972:web:f8a560473beaaa4d11c349"
};


// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new EmailAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { provider, auth, storage };
export default db;
