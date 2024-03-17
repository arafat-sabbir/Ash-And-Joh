import { PropTypes } from "prop-types"
import { toast } from "sonner";
import Input from "./Input";
import useAuth from "@/Hooks/useAuth";
import { useState } from "react";
import SocialLogin from "./SocialLogin";

const SignInForm = ({ setFormType }) => {
    const { signInUser, signWithGoogle } = useAuth()
    const [signInData, setSignUpData] = useState({ email: "", password: "" })
    const handleGoogleSignIn = async () => {
        const toastId = toast.loading("Signing In..")
        await signWithGoogle()
            .then(() => toast.success("Sign in SuccessFull", { id: toastId }))
            .catch(error => toast.error(error.message, { id: toastId }))
    }
    const handleSignIn = (e) => {
        e.preventDefault()
        signInUser(signInData.email, signInData.password)
            .then(() => {
                toast.success("Sign in Successful")
            })
            .catch(() => {
                toast.error("Invalid Email And Password")
            });
    }
    return (
        <form onSubmit={handleSignIn} className="flex flex-col px-12 gap-8">
            <Input name={"email"} type={"email"} onChange={(e) => setSignUpData({ ...signInData, email: e.target.value })} />
            <Input name={"password"} type={"password"} onChange={(e) => setSignUpData({ ...signInData, password: e.target.value })} />
            <button className="submitBtn">SignIn</button>
            <div className="divider m-0 text-black   divider-neutral opacity-50">OR</div>
            <SocialLogin onclick={handleGoogleSignIn} />
            <p className="text-black text-lg text-center my-2">New in Ash & Joh? Please <span className="cursor-pointer text-black underline font-semibold text-md" onClick={() => setFormType("signUp")}>SignUp</span></p>
        </form>
    );
};

export default SignInForm;


SignInForm.propTypes = {
    handleSignIn: PropTypes.func,
    setFormType: PropTypes.func
}