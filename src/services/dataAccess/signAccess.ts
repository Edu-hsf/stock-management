import { signInWithPopup, UserCredential, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { addUsersAction, getUsersAction, updateUsersAction } from "../actions/usersAction";

export const signInWithGoogleAccess = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, provider)
    .then(async result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const dataUser = await getUsersAction('email', '==', result.user.email)
      if (!dataUser) {
        const user = {
          avatar: 'default',
          email: result.user.email,
          isAuthWithGoogle: true,
          name: result.user.displayName,
          userUID: result.user.uid
        }
        addUsersAction(user)
      }
      return credential;

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage

    });
}

export const signUpAccess = async (email: string, password: string, name: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name
      })
      const documentUser = await getUsersAction('email', '==', user.email)
      if (documentUser) updateUsersAction(documentUser?.id, { uid: user.uid })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const signInAccess = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const logOutAccess = async () => {
  signOut(auth)
}