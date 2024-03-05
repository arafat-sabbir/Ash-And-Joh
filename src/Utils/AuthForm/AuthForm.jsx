import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";


const AuthForm = ({ formType, setFormType }) => {
    const [pending, setPending] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(true);
    const [error, setError] = useState("")

    const handleSignIn = async (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        try {
            setPending(true);
            // const res = await signIn("credentials", {
            //     email,
            //     password,
            //     redirect: false,
            // });

            // if (res.error) {
            //     toast.error("Invalid Credentials!");
            //     setPending(false);
            //     return;
            // }
            toast.success("Sign In Successful")
            setDialogOpen(false)
        } catch (error) {
            setPending(false);
            setError("Something went wrong!");
        }

        const userInfo = { email, password }
        form.reset()
    }
    const handleSignUp = async (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const username = form.username.value;
        console.log(username);
        const userInfo = { username, email, password }
        console.log(JSON.stringify(userInfo));
        if (password !== confirmPassword) {
            return toast.error("Password Doesn't Match")
        }
        try {
            setPending(true);
            console.log("userinfo", userInfo)
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            });
            if (res.ok) {
                setPending(false);
                toast.success("Registration Successful");
                setDialogOpen(false)
                form.reset()
            } else {
                setPending(false);
                console.log("Something Went Wrong");
                const errorData = await res.json();
                toast.error(errorData.message || "Something went wrong from this");
            }
        } catch (error) {
            setPending(false);
            console.error("Error:", error); // Log the error for debugging purposes

            let errorMessage = "An Error Occurred";
            if (error instanceof Error && error.message) {
                errorMessage = error.message; // Use the error message if available
            }
            toast.error(errorMessage);
        }


    }
    return (
        <div>
            {dialogOpen && <DialogContent className="bg-[#3B3B3B]">
                <DialogHeader>
                    <h1 className="text-center font-semibold text-white text-3xl my-6">Fauget</h1>
                    <DialogTitle className="text-center font-semibold text-white text-3xl">{formType === 'signIn' ? 'Sign In' : 'Sign Up'}</DialogTitle>
                    <DialogDescription>
                        {formType === 'signIn' ?
                            <form onSubmit={handleSignIn} className="flex flex-col px-10 bg-[#3B3B3B]">
                                <label className="text-white ml-[5px]" htmlFor="email">Email: </label>
                                <input required className="input-field" type="email" name="email" />
                                <label className="text-white ml-[5px]" htmlFor="password">Password:</label>
                                <input required className="input-field" type="password" name="password" />
                                <input required className="btn my-6 w-1/2 text-center bg-[#060606] cursor-pointer " type="submit" value="Sign In" />
                                <p className="text-gray-200 ml-1">Do not Have A Account? Create an Account  <span className="cursor-pointer text-black underline font-semibold text-lg" onClick={() => setFormType("signUp")}>SignUp</span></p>
                            </form>
                            : (<form onSubmit={handleSignUp} className="flex flex-col px-10 bg-[#3B3B3B]">
                                <label className="text-white ml-[5px]" htmlFor="email text-gray-200">UserName: </label>
                                <input required className="input-field" type="text" name="username" />
                                <label className="text-white ml-[5px]" htmlFor="email text-gray-200">Email: </label>
                                <input required className="input-field" type="email" name="email" />
                                <label className="text-white ml-[5px]" htmlFor="password">Password:</label>
                                <input required className="input-field" type="password" name="password" />
                                <label className="text-white ml-[5px]" htmlFor="password">Confirm Password:</label>
                                <input required className="input-field" type="password" name="confirmPassword" />
                                <input className="btn my-6 w-1/2 text-center bg-[#060606] cursor-pointer " type="submit" value="Sign Up" />
                                <p className="text-gray-200 ml-1">Have account? Sign in  account   <span className="cursor-pointer text-black underline font-semibold text-lg" onClick={() => setFormType("signIn")}>SignIn</span></p>
                            </form>)}
                    </DialogDescription>
                </DialogHeader>
                {/* Additional form fields based on formType */}
            </DialogContent>}
        </div>
    );
};

export default AuthForm;
