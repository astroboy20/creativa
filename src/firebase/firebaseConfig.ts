import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJXd4kAqryt0eeYlkVqVBDXw4h1-Bpdjs",
    authDomain: "creatives-7c094.firebaseapp.com",
    projectId: "creatives-7c094",
    storageBucket: "creatives-7c094.appspot.com",
    messagingSenderId: "976415938757",
    appId: "1:976415938757:web:fb2e03d99a9c50bf52b8ac",
    measurementId: "G-WVS958PHLE"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const fireStore = getFirestore(app)

export { auth, storage, fireStore };