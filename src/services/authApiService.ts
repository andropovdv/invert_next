import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import "../firebase";

const auth = getAuth();

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  },
  register: async (email: string, password: string, name?: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(res.user, { displayName: name });
    return res;
  },
  checkAuth: async (userFunc: (data: any) => void) => {
    onAuthStateChanged(auth, userFunc);
  },
  logout: async () => {
    await signOut(auth);
  },
};
