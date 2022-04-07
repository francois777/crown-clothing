import { initializeApp } from 'firebase/app'
import {  getAuth,
          signInWithRedirect,
          signInWithPopup,
          GoogleAuthProvider,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged,
          User,
          NextOrObserver,
          UserCredential
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDT0yVa11_oPvjggtkUH-s0RuCAgEngexk",
  authDomain: "crn-clothing-db-20911.firebaseapp.com",
  projectId: "crn-clothing-db-20911",
  storageBucket: "crn-clothing-db-20911.appspot.com",
  messagingSenderId: "917984175253",
  appId: "1:917984175253:web:cb4d3741a84118c68ea79c"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

// The following parameters are required by Google
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("[firebase], addCollectionAndDocuments, batch committed")
};

type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

type CategoryData = {
  imageUrl: string;
  items: CategoryItem[];
  title: string;
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    docSnapshot => docSnapshot.data() as CategoryData)
}

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

// Create a document and return a document reference
export const createUserDocumentFromAuth = async(
  userAuth: User,
  additionalInformation: AdditionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  // if user document exists, return this document
  // if user document does not exist, create it.
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
        console.log('error creating the user', error)
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (): Promise<void> => await signOut(auth)

// onAuthStateChanged is an open listener which is invoked whenever
// a user is authenticated or signs out.
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback)

// Other available parameters are:
// onAuthStateChanged(auth, callback, errorCallback, completedCallback)

// Converting to Saga implies converting from an observable listener to a
// promised-based function call.
// Since this is a promise, we don't want this listener to stay active. We
// want to unsubscribe the moment we get a value.
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe()
        resolve(userAuth)
      },
      reject
    )
  })
}
