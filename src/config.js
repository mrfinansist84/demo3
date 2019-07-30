import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCCPf2eBO8OuXoMMBCaQ8xXnznUE0saX-o",
    authDomain: "todo-af545.firebaseapp.com",
    databaseURL: "https://todo-af545.firebaseio.com",
    projectId: "todo-af545",
    storageBucket: "todo-af545.appspot.com",
    messagingSenderId: "943825692455",
    appId: "1:943825692455:web:70136e83a0a1f7fb"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebase1 = require("firebase");

require("firebase/firestore");
export const db = firebase1.firestore();
