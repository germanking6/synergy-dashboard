import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {//add your sensitive nfo
};

// init firebase
initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
export default db