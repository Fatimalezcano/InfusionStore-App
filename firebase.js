import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwQh5Cg2NQKzZHMIbcHR3eWCzlHHOrshY",
  authDomain: "pf-gp1.firebaseapp.com",
  projectId: "pf-gp1",
  storageBucket: "pf-gp1.appspot.com",
  messagingSenderId: "927317925312",
  appId: "1:927317925312:web:d38e5c8a5d687843d83c25",
};

export const app = firebase.initializeApp(firebaseConfig);
export const authentication = getAuth(app);
