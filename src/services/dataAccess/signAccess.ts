import { signInWithPopup, UserCredential, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { addUsersAction, getUsersAction } from "../actions/usersAction";

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
          name: result.user.displayName
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
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name
      })
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