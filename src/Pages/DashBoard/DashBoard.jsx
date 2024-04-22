import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { PiSignOutFill } from "react-icons/pi";
import { FaListUl } from "react-icons/fa6";
import useAuth from "@/Hooks/useAuth";
import { toast } from "sonner";
import Button from "@/Utils/AuthForm/Button";

const Dashboard = () => {
   const { userData, signOutUser } = useAuth();
   const handleSignOut = () => {
      console.log("sign Out Clicked");
      signOutUser()
         .then()
         .catch((error) => {
            toast.error(error.message);
         });
   };
   return (
      <>
         <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-4 sm:ml-14 lg:ml-80">
               {/* Page content here */}
               <Outlet></Outlet>
               <label
                  htmlFor="my-drawer-2"
                  className=" btn bg-black text-white border-y-4 border-y-main drawer-button lg:hidden absolute top-4 left-4"
               >
                  <FaListUl></FaListUl>
               </label>
            </div>
            <div className="drawer-side">
               <label
                  htmlFor="my-drawer-2"
                  aria-label="close sidebar"
                  className="drawer-overlay"
               ></label>
               <div className="menu p-4 w-80 min-h-full fixed md:bg-transparent !bg-[#FFF6EB] z-50">
                  {/* Sidebar content here */}
                  <Link
                     to={"/"}
                     className="flex justify-center items-center min-w-full mb-10"
                  >
                     <div className="flex flex-col justify-center items-center gap-2">
                        <img
                           src="https://i.ibb.co/8z14H1k/97db6719-cc5a-4ac1-b0ad-85686abd2e49.png"
                           className="w-[40px] h-[40px]"
                           alt=""
                        />
                        <div className="px-2  mx-2 lg:mx-0 font-bold text-2xl">
                           Ash&Joh
                        </div>
                     </div>
                  </Link>
                  <NavLink
                     className={({ isActive, isPending }) =>
                        isActive ? "dashActive" : isPending ? "pending" : ""
                     }
                     to={"/dashboard/myProfile"}
                  >
                     <button className="text-center py-2 bg-red-100 px-12  flex items-center justify-center min-w-full my-6">
                        <FaListCheck className="mr-4"></FaListCheck> My Profile
                     </button>
                  </NavLink>
                  <NavLink
                     className={({ isActive, isPending }) =>
                        isActive ? "dashActive" : isPending ? "pending" : ""
                     }
                     to={"/dashboard/addProduct"}
                  >
                     <button className="text-center py-2 bg-red-100 px-12  flex items-center justify-center min-w-full mb-6">
                        <FaListCheck className="mr-4"></FaListCheck> Add Product
                     </button>
                  </NavLink>
                  <NavLink
                     className={({ isActive, isPending }) =>
                        isActive ? "dashActive" : isPending ? "pending" : ""
                     }
                     to={"/dashboard/manageProduct"}
                  >
                     <button className="text-center py-2 bg-red-100 px-12  flex items-center justify-center min-w-full mb-6">
                        <FaListCheck className="mr-4"></FaListCheck> Manage
                        Product
                     </button>
                  </NavLink>
                  <NavLink
                     className={({ isActive, isPending }) =>
                        isActive ? "dashActive" : isPending ? "pending" : ""
                     }
                     to={"/dashboard/myCart"}
                  >
                     <button className="text-center py-2 bg-red-100 px-12  flex items-center justify-center min-w-full mb-6">
                        <FaListCheck className="mr-4"></FaListCheck> My Cart
                     </button>
                  </NavLink>
               </div>
            </div>
         </div>
      </>
   );
};

export default Dashboard;
