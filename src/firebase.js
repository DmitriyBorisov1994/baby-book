// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBDNhU0_gS_ZZXGPoxXHrOF_FLZHNEbhjI",
   authDomain: "baby-book-app-by-dborisov.firebaseapp.com",
   databaseURL: "https://baby-book-app-by-dborisov-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "baby-book-app-by-dborisov",
   storageBucket: "baby-book-app-by-dborisov.appspot.com",
   messagingSenderId: "871852195622",
   appId: "1:871852195622:web:0ad7089991cebabbe14be7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);