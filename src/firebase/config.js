import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAU58nab1WXFr_QBNwQ7L-E3bM-VPmMBbg",
  authDomain: "eshop-cedd4.firebaseapp.com",
  projectId: "eshop-cedd4",
  storageBucket: "eshop-cedd4.appspot.com",
  messagingSenderId: "409196017485",
  appId: "1:409196017485:web:8a5ac2e8232e9048eee904"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app