import { PropTypes } from "prop-types"
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Input from "./Input";
import useAuth from "@/Hooks/useAuth";
import { useState } from "react";

const SignInForm = ({ setFormType }) => {
    const { signInUser } = useAuth()
    const [signInData, setSignUpData] = useState({ email: "", password: "" })
    console.log(signInData);
    const handleSignIn = (e) => {
        e.preventDefault()
        signInUser(signInData.email, signInData.password)
            .then((result) => {
                toast.success("Sign in Successful")
            })
            .catch((error) => {
                console.log(error);
                toast.error("Invalid Email And Password")
            });
    }
    return (
        <form onSubmit={handleSignIn} className="flex flex-col px-12 gap-8">
            <Input name={"email"} type={"email"} onChange={(e) => setSignUpData({ ...signInData, email: e.target.value })} />
            <Input name={"password"} type={"password"} onChange={(e) => setSignUpData({ ...signInData, password: e.target.value })} />
            <button className="submitBtn">SignIn</button>
            <p className="text-black text-lg text-center my-2">New in Ash & Joh? Please <span className="cursor-pointer text-black underline font-semibold text-md" onClick={() => setFormType("signUp")}>SignUp</span></p>
        </form>
    );
};

export default SignInForm;

SignInForm.propTypes = {
    handleSignIn: PropTypes.function,
    setFormType: PropTypes.function
}