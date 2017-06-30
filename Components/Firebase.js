/**
 * Created by mycom on 2017-06-30.
 */
import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCjXOrUqSZjVl2NZGi5P-YXQ6d0rceOuk0",
    authDomain: "mysterynumber-87644.firebaseapp.com",
    databaseURL: "https://mysterynumber-87644.firebaseio.com",
    projectId: "mysterynumber-87644",
    storageBucket: "mysterynumber-87644.appspot.com",
    messagingSenderId: "426058848472"
};
firebase.initializeApp(config);
export default firebase;