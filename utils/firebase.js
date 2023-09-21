import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyAp0-FwaTTCA12BuqK1P-xk5bQ_4ug9PWU",

  authDomain: "chatapp-6a896.firebaseapp.com",

  databaseURL: "https://chatapp-6a896-default-rtdb.firebaseio.com",

  projectId: "chatapp-6a896",

  storageBucket: "chatapp-6a896.appspot.com",

  messagingSenderId: "505384455208",

  appId: "1:505384455208:web:322c0149ec74fda73cf91d"

};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new EmailAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { provider, auth, storage };
export default db;
