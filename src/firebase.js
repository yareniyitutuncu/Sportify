import { initializeApp } from "firebase/app";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";  // Firebase Storage importu
import { getMessaging } from "firebase/messaging"; // Firebase Messaging importu


const firebaseConfig = {
    apiKey: "AIzaSyBR6H3H-XwYI4ON8DzK8GTKmSYSzpjxGJg",
    authDomain: "sportify-ac2f3.firebaseapp.com",
    projectId: "sportify-ac2f3",
    storageBucket: "sportify-ac2f3.appspot.com", // Firebase Storage için doğru bucket URL'si
    messagingSenderId: "745313924642",
    appId: "1:745313924642:web:23c22803235f0fc20e7c7b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);  // Firebase Storage'ı başlatıyoruz
const messaging = getMessaging(app); // Messaging servisini başlatıyoruz


export { auth, db,messaging, updatePassword, reauthenticateWithCredential, EmailAuthProvider, setDoc, getDoc, doc, storage, ref, uploadBytes, getDownloadURL };
export default app;
