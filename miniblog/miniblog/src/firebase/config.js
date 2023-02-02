import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAL5BzFQ_sPfEA2UH1hnWsn8sb-2Dh-KlM",
  authDomain: "miniblog-380fd.firebaseapp.com",
  projectId: "miniblog-380fd",
  storageBucket: "miniblog-380fd.appspot.com",
  messagingSenderId: "653634288221",
  appId: "1:653634288221:web:d669b490250d07bc66abb4"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
