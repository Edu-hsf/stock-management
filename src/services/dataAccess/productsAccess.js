import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export class productsReferences {
    constructor() {
    }

    async create(productData) {
        const docSnap = await getDoc(doc(db, 'products/', productData.productCode));

        if (!docSnap.exists()) {
            await setDoc(doc(db, "products", productData.productCode), productData);
        } else {
            throw new Error('The code for this product has already been registered.')
        }
      
    }

    async get(productCode) {
        const docSnap = await getDoc(doc(db, 'products', productCode));

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            throw new Error('Product not found.')
        }
    }
}