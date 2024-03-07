import { Context } from "@/Auth/AuthProvider/AuthProvider";
import { PropTypes } from "prop-types"
import { useContext } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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
        <form onSubmit={handleSignIn} className="flex flex-col px-10">
            <label className=" ml-[5px]" htmlFor="email">Email: </label>
            <input required className="input-field" type="email" name="email" />
            <label className=" ml-[5px]" htmlFor="password">Password:</label>
            <input required className="input-field" type="password" name="password" />
            <input required className="w-full py-3 bg-gray-500 text-black rounded-full cursor-pointer" type="submit" value="Sign In" />
            <p className="text-black ml-1 text-center my-2">New in Ash & Joh? Please <span className="cursor-pointer text-black underline font-semibold text-lg" onClick={() => setFormType("signUp")}>SignUp</span></p>
        </form>
    );
};

export default SignInForm;

SignInForm.propTypes = {
    handleSignIn: PropTypes.obj,
    setFormType: PropTypes.obj
}