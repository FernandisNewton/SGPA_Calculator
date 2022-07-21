import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRiywhcWbYEBT7HgXileSxmvsu_ZiLWd0",
  authDomain: "sgpa-calculator-b7c8f.firebaseapp.com",
  projectId: "sgpa-calculator-b7c8f",
  storageBucket: "sgpa-calculator-b7c8f.appspot.com",
  messagingSenderId: "371476133141",
  appId: "1:371476133141:web:b06049dff9f4e9d58ae51c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let res = null;
const logInWithEmailAndPassword = async (email, password) => {
  try {
    res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

async function setData(sem, marks, sgpa) {
  console.log("setData");
  console.log(res);
  const user = res.user;
  try {
    await addDoc(collection(db, "marks"), {
      uid: user.uid,
      sem,
      marks,
      sgpa,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function getMarks(user) {
  const q = query(collection(db, "marks"), where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

export {
  auth,
  db,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  setData,
  getMarks,
};
