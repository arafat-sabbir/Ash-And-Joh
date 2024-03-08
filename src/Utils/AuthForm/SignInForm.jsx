import { Context } from "@/Auth/AuthProvider/AuthProvider";
import { PropTypes } from "prop-types"
import { useContext } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Input from "./Input";

const SignInForm = ({ setFormType }) => {
    const { signInUser } = useContext(Context);
    const handleSignIn = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const signIn = { name, email, password }
        console.log(signIn);
        signInUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Invalid Email And Password")
            });
    }
    return (
        <form onSubmit={handleSignIn} className="flex flex-col px-12 gap-8">
            <Input name={"email"} type={"email"} />
            <Input name={"password"} type={"password"} />
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