import { PropTypes } from "prop-types"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";


const AuthForm = ({ formType, setFormType }) => {
    const [dialogOpen, setDialogOpen] = useState(true);
    const handleSignIn = () => {

    }
    const handleSignUp = () => {

    }
    return (
        <div>
            {dialogOpen && <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center font-semibold  text-3xl">{formType === 'signIn' ? 'Sign In' : 'Sign Up'}</DialogTitle>
                    <DialogDescription>
                        {formType === 'signIn' ?
                            <SignInForm handleSignIn={handleSignIn} setFormType={setFormType} />
                            : (<SignUpForm setFormType={setFormType} handleSignUp={handleSignUp} />)}
                    </DialogDescription>
                </DialogHeader>
                {/* Additional form fields based on formType */}
            </DialogContent>}
        </div>
    );
};

export default AuthForm;

AuthForm.propTypes = {
    formType: PropTypes.string,
    setFormType: PropTypes.obj
}