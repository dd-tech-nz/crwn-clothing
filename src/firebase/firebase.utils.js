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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

 return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      // routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  console.log(transformedCollection)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase