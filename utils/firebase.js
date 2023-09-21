import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzQP3jcw-FLgCBm9iMgpDF7j0voUUpqjY",
  authDomain: "events-c2e88.firebaseapp.com",
  projectId: "events-c2e88",
  storageBucket: "events-c2e88.appspot.com",
  messagingSenderId: "638716242047",
  appId: "1:638716242047:web:0f5b412bff895234b9374a",
  measurementId: "G-TY0M13ECGZ"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new EmailAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { provider, auth, storage };
export default db;
