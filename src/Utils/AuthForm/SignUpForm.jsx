import useAuth from "@/Hooks/useAuth";
import { PropTypes } from "prop-types"
import Input from "./Input";
import { useState } from "react";
import toast from "react-hot-toast";
const SignUpForm = ({ setFormType }) => {
    const { signUpUser, updateUserProfile } = useAuth()
    const [signUpData, setSignUpData] = useState({ username: "", email: "", password: "", confirmPassword: "" })
    const handleSignUp = async (e) => {
        e.preventDefault()

        if (signUpData.password !== signUpData.confirmPassword) {
            return toast.error("Password Didn't Match Try Again")
        }
        await signUpUser(signUpData.email, signUpData.password)
            .then(async () => {
                await updateUserProfile(signUpData.username, "none")
                    .then(toast.success("Sign Up Successful"))
            })
            .catch(() => {
                toast.error("Invalid Email or Password")
            });
    }
    return (
        <form onSubmit={handleSignUp} className="flex flex-col px-10 gap-6">
            <Input name={"username"} type={"text"} onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })} />
            <Input name={"email"} type={"email"} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} />
            <Input name={"password"} type={"password"} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} />
            <Input name={"confirm Password"} type={"password"} onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })} />
            <button className="submitBtn">SignUp</button>
            <p className="text-black text-lg text-center mt-2">Already Has An Account  <span className="cursor-pointer text-black underline font-semibold text-md" onClick={() => setFormType("signIn")}>SignIn</span></p>
        </form>
    );
};

export default SignUpForm;

SignUpForm.propTypes = {
    handleSignUp: PropTypes.func,
    setFormType: PropTypes.func
}