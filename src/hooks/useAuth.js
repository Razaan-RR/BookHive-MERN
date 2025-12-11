import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const authInfo = useContext(AuthContext);

  // If context not ready yet, return safe fallback to avoid crash
  if (!authInfo) {
    return {
      user: null,
      loading: true,
      logOut: async () => {},
      signIn: async () => {},
      createUser: async () => {},
    };
  }

  const axiosSecure = useAxiosSecure();

  return {
    ...authInfo,
    axiosSecure,
  };
};

export default useAuth;
