import { where, collection, query, getDocs, addDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const addUsersAccess = async (data) => {
    const ref = collection(db, 'users')
    const response = await addDoc(ref, data)
    return response
}

export const setUsersAccess = async (document, data) => {
    const ref = doc(db, 'users', document)
    const response = await setDoc(ref, data)
    return response
}

export const getUsersAccess = async (field, opStr, value) => {
    const ref = collection(db, 'users')
    const q = query(ref, where(field, opStr, value));

    const querySnapshot = await getDocs(q);

    if (querySnapshot?.docs[0]?.data()) {
        return querySnapshot.docs[0].data()
    } else {
        return null
    }
}

export const updateUsersAccess = async (document, data) => {
    const ref = doc(db, 'users', document)
    const response = updateDoc(ref, data)
    return response
}