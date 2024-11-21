import { signInWithPopup, UserCredential, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { addUsersAction, getUsersAction } from "../actions/usersAction";
import { DataUserType } from "../actions/signAction";

export const signInWithGoogleAccess = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, provider)
    .then(async result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const dataUser = await getUsersAction('email', '==', result.user.email)
      console.log('ok1')
      if (!dataUser) {
        console.log('ok2')
        const fullName = result.user.displayName?.split(' ')
        const name = fullName ? fullName[0] : ''
        const surname = fullName && fullName[1] ? fullName[1] : ''
        console.log(name)
        console.log(surname)

        const user = {
          name: name,
          surname: surname,
          email: result.user.email,
          avatar: result.user.photoURL,
          userUID: result.user.uid
        }

        await addUsersAction(user)
      }
      return credential;


    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage

    });
}

export const signUpAccess = async (data: DataUserType) => {
  const { password, ...dataUser } = data
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
    updateProfile(userCredential.user, {
      displayName: data.name.charAt(0).toUpperCase() + data.name.slice(1) + " " + data.surname.charAt(0).toUpperCase() + data.surname.slice(1)
    })

    await addUsersAction({ ...dataUser, uid: userCredential.user.uid })

  } catch (error) {
    throw error
  }
}

export const signInAccess = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }

}

export const logOutAccess = async () => {
  signOut(auth)
}