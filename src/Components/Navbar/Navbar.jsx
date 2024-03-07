import { Link, NavLink } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AuthForm from "@/Utils/AuthForm/AuthForm";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "@/Hooks/useAuth";
import useIsScrolled from "@/Hooks/useIsScrolled";

const Navbar = () => {
   const [formType, setFormType] = useState(null);

   const { isScrolled } = useIsScrolled()
   const { user, signOutUser } = useAuth()
   const handleSignOut = () => {
      signOutUser()
         .then((result) => {
            const user = result.user;
            console.log(user);
            Swal.fire({
               title: "Good job!",
               text: "Log Out Successfully",
               icon: "success",
            });
         })
         .catch((error) => {
            console.error(error);
            Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Something went wrong!",
               footer: '<a href="#">Why do I have this issue?</a>',
            });
         });
   };
   const NavLinks = (
      <>
         <li>
            <NavLink to={"/"}>Home</NavLink>
         </li>
         <li>
            <NavLink to={"/shop"}>Shop</NavLink>
         </li>
         <li>
            <NavLink to={"/tread"}>Tread</NavLink>
         </li>
      </>
   );
   return (
      <div className={`navbar ${isScrolled ? "fixed top-4 left-0 right-0 container mx-auto" : ""}`}>
         <div className="navbar-start">
            <div className="dropdown">
               <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
               >
                  {NavLinks}
               </ul>
            </div>
            <Link to={"/"}>
               <img
                  src="https://i.ibb.co/8z14H1k/97db6719-cc5a-4ac1-b0ad-85686abd2e49.png"
                  alt=""
                  className="h-16 w-16"
               />
            </Link>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{NavLinks}</ul>
         </div>
         <div className="navbar-end">
            {user ? (
               <>
                  <h1 className="mr-4">{user?.displayName}</h1>
                  <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button></>
            ) : (
               <Dialog>
                  <DialogTrigger>
                     <div className="btn">Sign In</div>
                  </DialogTrigger>
                  <AuthForm formType={formType} setFormType={setFormType} />
               </Dialog>
            )}
         </div>
      </div>
   );
};

export default Navbar;
