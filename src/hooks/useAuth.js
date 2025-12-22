import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useAuth = () => {
  const authInfo = useContext(AuthContext);

  // Safe fallback
  if (!authInfo) {
    return {
      user: null,
      loading: true,
      logOut: async () => {},
      signIn: async () => {},
      createUser: async () => {},
      updateUserProfile: async () => {},
    };
  }

  const axiosSecure = useAxiosSecure();
  const auth = getAuth();

  // Add profile update function
  const updateUserProfile = async (name, photoFileOrURL) => {
    if (!auth.currentUser) throw new Error("User not logged in");

    let photoURL = photoFileOrURL;

    // If a File object is passed, upload to Firebase Storage
    if (photoFileOrURL instanceof File) {
      const storage = getStorage();
      const photoRef = ref(
        storage,
        `profileImages/${auth.currentUser.uid}-${Date.now()}`
      );
      await uploadBytes(photoRef, photoFileOrURL);
      photoURL = await getDownloadURL(photoRef);
    }

    // Update Firebase Auth profile
    await updateProfile(auth.currentUser, { displayName: name, photoURL });

    // Update backend MongoDB
    await axiosSecure.post("/user", {
      email: auth.currentUser.email,
      name,
      uid: auth.currentUser.uid,
      photoURL,
    });
  };

  return {
    ...authInfo,
    axiosSecure,
    updateUserProfile,
  };
};

export default useAuth;
