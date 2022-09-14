import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const firebaseSignIn = async (email: string, password: string) => {
   const auth = getAuth();
   const response = await signInWithEmailAndPassword(auth, email, password)
   const { email: userEmail, uid: userId, refreshToken: userToken } = response.user
   return { userEmail, userId, userToken }
}

export const firebaseSignUp = async (email: string, password: string) => {
   const auth = getAuth();
   const response = await createUserWithEmailAndPassword(auth, email, password)
   const { email: userEmail, uid: userId, refreshToken: userToken } = response.user
   return { userEmail, userId, userToken }
}