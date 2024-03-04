import { useContext } from "react";
import { Context } from "../../../Auth/Authprovider/AuthProvider";

const useAuth = () => {
  const auth = useContext(Context);
  return auth;
};

export default useAuth;
