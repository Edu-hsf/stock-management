import { where, collection, query, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export class usersReferences {
    constructor() {
    } 

    async register(data) {
        const ref = collection(db, "users")
        await addDoc(ref, data);
    }

    async get(email) {
        const ref = collection(db, "users")
        const q = query(ref, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        if (querySnapshot?.docs[0]?.data()) {
            return querySnapshot.docs[0].data()
        } else {
            return false
        }
    }

    async authenticate (email, password) {
        const q1 = query(collection(db, "users"), where("email", "==", email));
        const q2 = query(collection(db, "users"), where("password", "==", password));

        const querySnapshot1 = await getDocs(q1);
        const querySnapshot2 = await getDocs(q2)

        if (querySnapshot1?.docs[0]?.data() && querySnapshot2?.docs[0]?.data()) {
            return true
        } else {
            return false
        }
    }
}