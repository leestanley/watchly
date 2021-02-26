import app from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/database';
import ax from 'axios';

const BASE_API = process.env.REACT_APP_API_URL;
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    login = (email, password, onSuccess = undefined, onError = undefined) => {
        this.auth.signInWithEmailAndPassword(email, password)
            .then((data) => {
                if (onSuccess !== undefined) onSuccess(data);
            })
            .catch(onError);
    }

    logout = () => {
        this.auth.signOut();
    }

    register = (username, email, password, onSuccess = undefined, onError = undefined) => {
        this.auth.createUserWithEmailAndPassword(email, password)
            .then((data) => {
                // create new entry in database
                ax.post(`${BASE_API}/users/createUser`, {
                    username,
                    email
                }).then((res) => {
                    if (onSuccess !== undefined) onSuccess(res);
                }).catch(onError);
            })
            .catch(onError);
    }

    loggedIn = () => {
        return (this.auth.currentUser != null);
    }
}

export default new Firebase();