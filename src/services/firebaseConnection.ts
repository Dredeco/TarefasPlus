// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDuBdJO2FXPz_zzzS3XuQn1t5mSEcoNcME",
    authDomain: "listatarefas-b5523.firebaseapp.com",
    projectId: "listatarefas-b5523",
    storageBucket: "listatarefas-b5523.appspot.com",
    messagingSenderId: "338389244304",
    appId: "1:338389244304:web:49b3fb515fd5352ef8fb15"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

export { db };