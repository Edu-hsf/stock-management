import {
  signInWithPopup,
  UserCredential,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
  updatePassword
} from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { getUsersAction, setUsersAction } from "../actions/usersAction";
import { DataUserType } from "../actions/signAction";
import { authEmailAction } from "../actions/emailAction";

export const signInWithGoogleAccess = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, provider)
    .then(async result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const dataUser = await getUsersAction('email', '==', result.user.email)
      if (!dataUser) {
        const fullName = result.user.displayName?.split(' ')
        const name = fullName ? fullName[0] : ''
        const surname = fullName && fullName[1] ? fullName[1] : ''

        const user = {
          name: name,
          surname: surname,
          email: result.user.email,
          avatar: { name: 'profile', url: result.user.photoURL },
          userUID: result.user.uid
        }

        await setUsersAction(result.user.uid, user)
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

    await setUsersAction(userCredential.user.uid, { ...dataUser, uid: userCredential.user.uid })

    await authEmailAction(userCredential.user)

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

export const reAuthUserAccess = async (user: User, password: string) => {
  const credential = EmailAuthProvider.credential(user.email!, password);

  await reauthenticateWithCredential(user, credential);
}

export const updatePasswordAccess = async (user: User, newPassword: string) => {
  await updatePassword(user, newPassword)
}

export const logOutAccess = async () => {
  signOut(auth)
}