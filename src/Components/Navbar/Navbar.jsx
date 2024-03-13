import { Link, NavLink } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AuthForm from "@/Utils/AuthForm/AuthForm";
import { useState } from "react";
import useAuth from "@/Hooks/useAuth";
import useIsScrolled from "@/Hooks/useIsScrolled";
import Button from "@/Utils/AuthForm/Button";

const Navbar = () => {
    const [formType, setFormType] = useState(null);
    const { isScrolled } = useIsScrolled();
    const { user } = useAuth();

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
            <div className="bg-white">
                <div className={`navbar ${isScrolled ? "fixed top-4 left-0 right-0" : ""} container mx-auto`}>
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
                        <ul className="flex gap-4 mr-6 text-xl font-medium">
                            {NavLinks}
                        </ul>
                        {user ? (
                            <>
                                <h1 className="mr-4">{user?.displayName}</h1>
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
            <div style={{ backgroundImage: "url('https://i.ibb.co/J2DdBJh/Group-9-1.png')" }} className="bg-cover bg-no-repeat h-[60vh] bg-center flex justify-center items-center relative">
                <h1 className={`text-5xl absolute ${isScrolled ? "right-0 transform -translate-y-60 -translate-x-[600px]" : ""}`}>Ash & Joh</h1>
            </div>
        </>
    );
};

export default Navbar;
