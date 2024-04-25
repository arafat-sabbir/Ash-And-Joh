import { Link, NavLink } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AuthForm from "@/Utils/AuthForm/AuthForm";
import { useState } from "react";
import useAuth from "@/Hooks/useAuth";
import useIsScrolled from "@/Hooks/useIsScrolled";
import Button from "@/Utils/AuthForm/Button";
import useCartProduct from "@/Utils/Hooks/Api/useCartProduct";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = () => {
    const [formType, setFormType] = useState(null);
    const { isScrolled } = useIsScrolled();
    const { user } = useAuth();
    const { cartProduct } = useCartProduct()

    const NavLinks = (
        <>
            <li className="NavLink">
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="NavLink">
                <NavLink to={"/shop"}>Shop</NavLink>
            </li>
            <li className="NavLink">
                <NavLink to={"/tread"}>Tread</NavLink>
            </li>
        </>
    );

    return (
        <>
            <div className="bg-white :z-50">
                <div className={`navbar ${isScrolled ? " top-4 left-0 right-0" : ""} container mx-auto`}>
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
                    <div className="navbar-end">
                        <ul className=" gap-4 lg:flex hidden mr-6 text-xl font-medium">
                            {NavLinks}
                        </ul>
                        {user ? (
                            <>
                                {cartProduct?.length > 0 && <Link to={"/dashboard/myCart"} className="relative mr-6 bg-gray-100 p-2 rounded-full text-white"><span><MdOutlineShoppingBag size={24} className="text-red-500" /></span> <span className="absolute bottom-6 left-7 text-red-500 text-xl font-medium">{cartProduct?.length}</span></Link>}

                                <Link to={"/Dashboard/myProfile"}><Button image={user.photoURL} title={"Account"} /></Link>
                            </>
                        ) : (
                            <Dialog>
                                <DialogTrigger>
                                    <Button title={"Login"} />
                                </DialogTrigger>
                                <AuthForm formType={formType} setFormType={setFormType} />
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
