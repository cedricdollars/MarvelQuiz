import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Config = {
    apiKey: "AIzaSyBVQCP7sVJGxwyf3XiTiy1PCzqZTPIncco",
    authDomain: "marvel-quiz-41595.firebaseapp.com",
    databaseURL: "https://marvel-quiz-41595.firebaseio.com",
    projectId: "marvel-quiz-41595",
    storageBucket: "marvel-quiz-41595.appspot.com",
    messagingSenderId: "818454955787",
    appId: "1:818454955787:web:7b78ed236bf95bbf8ac40e"
  };

class Firebase {
    constructor() {
        app.initializeApp(Config);
        this.auth = app.auth()
        this.db = app.firestore();     
    }

    //Inscription
     signupUser = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    }

    //Connexion
    loginUser = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password);
    }

    //Déconnexion
    logoutUser = ()=> {
        this.auth.signOut();
    }
    // Récupérer le mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);
        
    user = uid => this.db.doc(`users/${uid}`);
}
export default Firebase