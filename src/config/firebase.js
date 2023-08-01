
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import  { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyA8_Lb8PZLohMMAviNCLL1kVQ-lalGDOP8",
    authDomain: "fir-practice-63ac5.firebaseapp.com",
    projectId: "fir-practice-63ac5",
    storageBucket: "fir-practice-63ac5.appspot.com",
    messagingSenderId: "596748232175",
    appId: "1:596748232175:web:46f7840192c6041c9e021a",
    measurementId: "G-VH5F2E24RZ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleprovider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)