import { PropTypes } from "prop-types"
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


const AuthForm = ({ formType, setFormType }) => {
    const [dialogOpen, setDialogOpen] = useState(true);
    return (
        <div>
            {dialogOpen && <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center py-10 font-semibold  text-3xl">{formType === 'signIn' ? 'Sign In' : 'Sign Up'}</DialogTitle>
                    <DialogDescription>
                        {formType === 'signUp' ?
                            (<SignUpForm setFormType={setFormType} />)
                            : (<SignInForm setFormType={setFormType} />)
                        }
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