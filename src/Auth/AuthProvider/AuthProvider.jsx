import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { app } from "@/Config/firebase.config";
import useAxios from "@/Hooks/useAxios";

export const Context = createContext("");

const AuthProvider = ({ children }) => {
    const axios = useAxios();
    const [user, setUser] = useState("");
    const [loader, setLoader] = useState(true);
    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();

    const signWithGoogle = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signUpUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (name, photoUrl) => {
        setLoader(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        });
    };
    const signInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signOutUser = () => {
        return signOut(auth);
    };

    const contextValue = {
        signUpUser,
        signInUser,
        signWithGoogle,
        user,
        loader,
        signOutUser,
        updateUserProfile,
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const user = { email: currentUser.email };
                axios.post("/user/accessToken", user).then((res) => {
                    const token = res.data.token;
                    if (token) {
                        localStorage.setItem("access-token", token);
                        setLoader(false);
                    }
                });
            } else {
                localStorage.removeItem("access-token");
                setLoader(false);
            }
        });
        return () => unsubscribe();
    }, [auth, axios]);
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
};
