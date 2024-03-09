import { PropTypes } from "prop-types"
import { useState } from "react";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";



const AuthForm = ({ formType, setFormType }) => {
    // eslint-disable-next-line no-unused-vars
    const [dialogOpen, setDialogOpen] = useState(true);
    return (
        <div>
            {dialogOpen && <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center py-10 font-semibold  text-3xl">{formType === 'signUp' ? 'Sign Up' : 'Sign In'}</DialogTitle>
                    <DialogDescription>

                        {formType === 'signUp' ?
                            (<SignUpForm setFormType={setFormType} />)
                            : (<SignInForm setFormType={setFormType} />)
                        }

                        {formType === 'signIn' ?
                            <SignInForm setFormType={setFormType} />
                            : (<SignUpForm setFormType={setFormType} />)}

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