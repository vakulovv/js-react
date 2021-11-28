import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

var config = {
    apiKey: "AIzaSyACqWfp2AypDqKqfZdyZD9KyElban3VHQU",
    authDomain: "myproject01-eacac.firebaseapp.com",
    projectId: "myproject01-eacac",
    storageBucket: "myproject01-eacac.appspot.com",
    messagingSenderId: "225439182455",
    appId: "1:225439182455:web:503159e9a48449fdf82072"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;