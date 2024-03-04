import { Link } from "react-router-dom";
import logo from "../../../public/logo.jpeg";
import useAuth from "../../Utility/Hooks/useAuth/useAuth";

const Navbar = () => {
   const { user, signOutUser } = useAuth();
   const handleSignOut = () => {
      signOutUser()
         .then((result) => {
            console.log(result);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   const links = (
      <>
         <li>
            <a>Home</a>
         </li>
         <li>
            <a>Shop</a>
         </li>
         <li>
            <a>Tread</a>
         </li>
      </>
   );
   return (
      <div className="navbar bg-base-100">
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
                  {links}
               </ul>
            </div>
            <img src={logo} className="w-32 h-10" alt="" />
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
         </div>
         <div className="navbar-end">
            <div className="dropdown dropdown-bottom dropdown-end z-50 ">
               <label tabIndex={0} className="">
                  {user && (
                     <img
                        className="w-12 mr-4 h-12  rounded-full border-2 border-main  "
                        src={user?.photoURL}
                        alt=""
                     />
                  )}
               </label>

               {user && (
                  <ul className="p-2 shadow menu dropdown-content bg-white z-[1]  rounded-box w-56">
                     <img
                        className=" w-12 mx-auto  rounded-full mb-2 mt-2 border-2 border-main"
                        src={user?.photoURL}
                        alt=""
                     />
                     <p className="font-semibold text-center mr-2 mb-2 text-main ">
                        {user?.displayName}
                     </p>
                     <p className="font-semibold text-center mr-2 mb-2  text-main ">
                        {user?.email}
                     </p>
                     <div className="pb-2 mx-auto" onClick={handleSignOut}>
                        <button className="py-2 px-12 rounded-full mt-1  bg-black border-y-4 border-x-1 text-white border-main">
                           Sign Out
                        </button>
                     </div>
                  </ul>
               )}
            </div>
            {user ? (
               ""
            ) : (
               <div>
                  <Link to={"/signIn "} className="">
                     <button className="px-6 py-2 font-medium rounded-sm bg-black border-b-4 border-b-main text-white">
                        Sign In
                     </button>
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
};

export default Navbar;
