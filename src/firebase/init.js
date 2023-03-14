import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkrd1-WWfzAEBDKeh2-L7Rj8eu8liaAFY",
  authDomain: "synergy-52306.firebaseapp.com",
  databaseURL: "https://synergy-52306-default-rtdb.firebaseio.com",
  projectId: "synergy-52306",
  storageBucket: "synergy-52306.appspot.com",
  messagingSenderId: "764371875112",
  appId: "1:764371875112:web:c046d12c91e83db0c50c1d",
  measurementId: "G-T7N01Z0JQR"
};

// init firebase
initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
export default db