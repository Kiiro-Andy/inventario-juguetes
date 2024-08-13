import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAmqITu8m_P6qiLpGSDpTeR3b5SnrFLWZM",
  authDomain: "jugueterialy.firebaseapp.com",
  projectId: "jugueterialy",
  storageBucket: "jugueterialy.appspot.com",
  messagingSenderId: "365073473203",
  appId: "1:365073473203:web:298fb4363c403a0e025ac6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };