import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5CzT6GgSwKk8Fu_5k6SyhUEiMpJ6JHQs",
    authDomain: "mj-cloth.firebaseapp.com",
    projectId: "mj-cloth",
    storageBucket: "mj-cloth.appspot.com",
    messagingSenderId: "2630103568",
    appId: "1:2630103568:web:d5cdd3a7e19b84b63d1095"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocument=async (collectionKey,objectToAdd) =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectToAdd.forEach((object) => {
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });

    await batch.commit();
   
};

export const getCategoriesAndDocuments=async () =>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const qsnap = await getDocs(q);
    const catmap =qsnap.docs.reduce((acc,docSnap) => {
        const {title,items} = docSnap.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
   return catmap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInforamtion = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInforamtion
            });
        } catch (error) {
            console.log('error createting the user', error.message)
        }

    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    return   await signOut(auth);
};

export const onAuthStateChangedListner =  (callback) => {
    return    onAuthStateChanged(auth,callback);
};

