import { PropTypes } from "prop-types"
const SignUpForm = ({ setFormType }) => {
    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name;
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
            <p className="text-black ml-1">Have account? Sign in  account   <span className="cursor-pointer text-black underline font-semibold text-lg" onClick={() => setFormType("signIn")}>SignIn</span></p>
        </form>
    );
};

export default SignUpForm;

SignUpForm.propTypes = {
    handleSignUp: PropTypes.obj,
    setFormType: PropTypes.obj
}