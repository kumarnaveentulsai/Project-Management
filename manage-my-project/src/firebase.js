import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCn2BNKsgWHHeIvEiiUge-Tp-fUuSGaOFw",
  authDomain: "project-management-1a075.firebaseapp.com",
  projectId: "project-management-1a075",
  storageBucket: "project-management-1a075.appspot.com",
  messagingSenderId: "39215285320",
  appId: "1:39215285320:web:ec9fcafd7c8517ecb6047d",
  measurementId: "G-X768J8FFDK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const updateUserDatabase = async (user, uid) => {
  if(typeof user !== "object") return;

  const docRef = doc(db, "users", uid);
  await setDoc(docRef, {...user});
}

export {app as default, analytics, auth, db};