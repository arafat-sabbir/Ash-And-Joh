import { PropTypes } from "prop-types"

const SignInForm = ({  setFormType }) => {
    const handleSignIn = ()=>{
        
    }
    return (
        <form onSubmit={handleSignIn} className="flex flex-col px-10">
            <label className=" ml-[5px]" htmlFor="email">Email: </label>
            <input required className="input-field" type="email" name="email" />
            <label className=" ml-[5px]" htmlFor="password">Password:</label>
            <input required className="input-field" type="password" name="password" />
            <input required className="w-full py-3 bg-gray-500 text-black rounded-full cursor-pointer" type="submit" value="Sign In" />
            <p className="text-black ml-1">Do not Have A Account? Create an Account  <span className="cursor-pointer text-black underline font-semibold text-lg" onClick={() => setFormType("signUp")}>SignUp</span></p>
        </form>
    );
};

export default SignInForm;

SignInForm.propTypes = {
    handleSignIn: PropTypes.obj,
    setFormType: PropTypes.obj
}