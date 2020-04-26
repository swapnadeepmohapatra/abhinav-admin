import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
	aapiKey: 'AIzaSyBCBXqUpC63yqVet479R9ZGgw5SOOLaZvc',
	authDomain: 'abhinav-photo.firebaseapp.com',
	databaseURL: 'https://abhinav-photo.firebaseio.com',
	projectId: 'abhinav-photo',
	storageBucket: 'abhinav-photo.appspot.com',
	messagingSenderId: '405541571345',
	appId: '1:405541571345:web:79cf13c04e164cc8125ab0',
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database();

export { storage, firebase, database as default };
