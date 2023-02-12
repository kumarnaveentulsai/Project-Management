import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

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
const storage = getStorage(app);

const updateUserDatabase = async (user, uid) => {
  if(typeof user !== "object") return;

  const docRef = doc(db, "users", uid);
  await setDoc(docRef, {...user});
}

const getUserDatabase = async (uid) => {
  const docRef = doc(db, "users", uid);
  const result = await getDoc(docRef);

  if(!result.exists()) return null;
  return result.data();
}

const uploadImage = (file, progressCallback, urlCallback, errorCallback) => {
  if(!file) {
    errorCallback("File Not Found!!");
    return;
  }

  const fileType = file.type;
  const fileSize = file.size / 1024 / 1024;

  if(!fileType.includes("image")) {
    errorCallback("File must be an image");
    return;
  }

  if(fileSize > 2) {
    errorCallback("File must be smaller than 2MB");
    return;
  }

  const storageRef = ref(storage, `images/${file.name}`);
  
  const task = uploadBytesResumable(storageRef, file);
  task.on('state_changed',(snapshot)=>{
    // progress state changes
    console.log(snapshot);
    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    progressCallback(progress);
  }, error => {
    // at error detection
    errorCallback(error.message);
  }, ()=> {
    // complete file uploaded
    getDownloadURL(storageRef).then((url)=> {
      urlCallback(url);
    })
  })
}

export {app as default, analytics, auth, db, updateUserDatabase, getUserDatabase, uploadImage};