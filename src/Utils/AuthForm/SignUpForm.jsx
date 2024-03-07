import useAuth from "@/Hooks/useAuth";
import { PropTypes } from "prop-types"
import Swal from "sweetalert2";
const SignUpForm = ({ setFormType }) => {
    const { signUpUser, updateUserProfile } = useAuth()
    const handleSignUp = async (e) => {
        e.preventDefault()
        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const signUp = { username, email, password }
        await signUpUser(email, password)
            .then(async (result) => {
                await updateUserProfile(username, "none")
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
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

    }
    return (
        <form onSubmit={handleSignUp} className="flex flex-col px-10">
            <label className="ml-[5px]" htmlFor="email text-gray-200">UserName: </label>
            <input required className="input-field" type="text" name="username" />
            <label className="ml-[5px]" htmlFor="email text-gray-200">Email: </label>
            <input required className="input-field" type="email" name="email" />
            <label className="ml-[5px]" htmlFor="password">Password:</label>
            <input required className="input-field" type="password" name="password" />
            <label className="ml-[5px]" htmlFor="password">Confirm Password:</label>
            <input required className="input-field" type="password" name="confirmPassword" />
            <input className="w-full py-3 bg-gray-500 text-black rounded-full cursor-pointer " type="submit" value="Sign Up" />
            <p className="text-black ml-1 text-center my-2">Already have an account? Please <span className="cursor-pointer text-black underline font-semibold text-lg" onClick={() => setFormType("signIn")}>SignIn</span></p>
        </form>
    );
};

export default SignUpForm;

SignUpForm.propTypes = {
    handleSignUp: PropTypes.obj,
    setFormType: PropTypes.obj
}