/**
 * Created by mycom on 2017-06-30.
 */
import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBMUrSDNS9noOlx4T1iFRE7vlLw1YGqIr4",
    authDomain: "mysterynumber-77315.firebaseapp.com",
    databaseURL: "https://mysterynumber-77315.firebaseio.com",
    projectId: "mysterynumber-77315",
    storageBucket: "mysterynumber-77315.appspot.com",
    messagingSenderId: "567194010575"
};
firebase.initializeApp(config);
export default firebase;