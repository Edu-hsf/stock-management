import { setDoc, doc, collection, addDoc, WhereFilterOp, where, query, getDocs, updateDoc, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";

type docsType = {
    id: string,
    data: DocumentData
}

export const addStocksAccess = async (data: object) => {
    const ref = collection(db, 'stocks')
    const response = await addDoc(ref, data)
    return response
}

export const setStocksAccess = async (documentId: string, data: object) => {
    const ref = doc(db, 'stocks', documentId)
    const response = await setDoc(ref, data)
    return response
}

export const getStocksAccess = async (field: string, opStr: WhereFilterOp, value: unknown) => {
    const ref = collection(db, 'stocks')
    const q = query(ref, where(field, opStr, value));

    const querySnapshot = await getDocs(q);

    let docs: Array<docsType> = []
    querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, data: doc.data() })
    })
    return docs
}

export const updateStocksAccess = async (documentId: string, data: object) => {
    const ref = doc(db, 'stocks', documentId)
    const response = updateDoc(ref, data)
    return response
}

export const getAllStocksAccess = async () => {
    const ref = collection(db, 'stocks')

    const querySnapshot = await getDocs(ref);
    let docs: Array<docsType> = []
    querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, data: doc.data() })
    })
    return docs
}