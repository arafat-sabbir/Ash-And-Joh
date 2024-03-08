import useAuth from "@/Hooks/useAuth";
import { PropTypes } from "prop-types"
import Swal from "sweetalert2";
import Input from "./Input";
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
        <form onSubmit={handleSignUp} className="flex flex-col px-10 gap-6">
            <Input name={"username"} type={"text"} />
            <Input name={"email"} type={"email"} />
            <Input name={"password"} type={"password"} />
            <Input name={"confirm Password"} type={"password"} />
            <button className="submitBtn">SignUp</button>
            <p className="text-black text-lg text-center mt-2">Already Has An Account  <span className="cursor-pointer text-black underline font-semibold text-md" onClick={() => setFormType("signIn")}>SignIn</span></p>
        </form>
    );
};

export default SignUpForm;

SignUpForm.propTypes = {
    handleSignUp: PropTypes.function,
    setFormType: PropTypes.function
}