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
import app from "../Firebase/firebase.config";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";

export const Context = createContext("");

const AuthProvider = ({ children }) => {
   const axios  = useAxios()
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
         const userEmail = currentUser?.email || user?.email;
         const loggedUser = { email: userEmail };

         setUser(currentUser);
         setLoader(false);
         //  if (currentUser) {
         //    const user = { email: currentUser.email };
         //    axios.post("/user/accessToken", user).then((res) => {
         //      const token = res.data.token;
         //      if (token) {
         //        localStorage.setItem("access-token", token);
         //        setLoader(false);
         //      }
         //    });
         //  } else {
         //    localStorage.removeItem("access-token");
         //    setLoader(false);
         //  }
         if (currentUser) {
            axios
               .post("/jwt", loggedUser, {
                  withCredentials: true,
               })
               .then((res) => {
                  console.log(res.data);
               });
         } else {
            axios.post("/signout", loggedUser, {
               withCredentials: true,
            })
            .then(res=>{
              console.log(res.data)
            })
         }
      });
      return () => unsubscribe();
   }, [auth, axios, user?.email]);
   console.log(user);
   return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
   children: PropTypes.node,
};
