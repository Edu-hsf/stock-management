import { setDoc, doc, collection, addDoc, WhereFilterOp, where, query, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addProductsAccess = async (data: object) => {
    const ref = collection(db, 'products')
    const response = await addDoc(ref, data)
    return response
}

export const setProductsAccess = async (documentId: string, data: object) => {
    const ref = doc(db, 'products', documentId)
    const response = await setDoc(ref, data)
    return response
}

export const getProductsAccess = async (field: string, opStr: WhereFilterOp, value: unknown) => {
    const ref = collection(db, 'products')
    const q = query(ref, where(field, opStr, value));

    const querySnapshot = await getDocs(q);

    if (querySnapshot?.docs[0]?.data()) {
        return querySnapshot.docs[0].data()
    } else {
        return null
    }
}

export const updateProductsAccess = async (documentId: string, data: object) => {
    const ref = doc(db, 'products', documentId)
    const response = updateDoc(ref, data)
    return response
}