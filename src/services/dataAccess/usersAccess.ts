import { where, collection, query, getDocs, addDoc, setDoc, updateDoc, doc, WhereFilterOp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addUsersAccess = async (data: object) => {
    const ref = collection(db, 'users')
    const response = await addDoc(ref, data)
    return response
}

export const setUsersAccess = async (documentId: string, data: object) => {
    const ref = doc(db, 'users', documentId)
    const response = await setDoc(ref, data)
    return response
}

export const getUsersAccess = async (field: string, opStr: WhereFilterOp, value: unknown) => {
    const ref = collection(db, 'users')
    const q = query(ref, where(field, opStr, value));

    const querySnapshot = await getDocs(q);

    if (querySnapshot?.docs[0]?.data()) {
        return querySnapshot.docs[0].data()
    } else {
        return null
    }
}

export const updateUsersAccess = async (documentId: string, data: object) => {
    const ref = doc(db, 'users', documentId)
    const response = updateDoc(ref, data)
    return response
}