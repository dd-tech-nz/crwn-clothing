import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCsBZCS8cYLPgmLKF_q5TEx6CibqQl9hGw",
  authDomain: "crwn-db-8c733.firebaseapp.com",
  databaseURL: "https://crwn-db-8c733.firebaseio.com",
  projectId: "crwn-db-8c733",
  storageBucket: "crwn-db-8c733.appspot.com",
  messagingSenderId: "134596264313",
  appId: "1:134596264313:web:f80a4f75c8320c57c56fa8",
  measurementId: "G-QVLCBS6PL7"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase