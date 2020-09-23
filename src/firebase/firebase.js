import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAn4zSqGNbrq7-xdzBBF5d0Yz9NmIy3CGY",
	authDomain: "todo-4026f.firebaseapp.com",
	databaseURL: "https://todo-4026f.firebaseio.com",
	projectId: "todo-4026f",
	storageBucket: "todo-4026f.appspot.com",
	messagingSenderId: "308077549912",
	appId: "1:308077549912:web:7c7d7b72c691a552132d2d",
	measurementId: "G-G1ZS3GNGXB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
