import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};
