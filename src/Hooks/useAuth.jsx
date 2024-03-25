import { Context } from "@/Auth/AuthProvider/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
    const auth = useContext(Context)
    return auth;
};

export default useAuth;