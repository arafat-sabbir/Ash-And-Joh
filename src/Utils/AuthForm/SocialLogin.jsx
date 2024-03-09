import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { PropTypes } from "prop-types"

const SocialLogin = ({ onclick }) => {
    return (
        <motion.button
            onClick={onclick}
            type="button"
            className="py-2 group relative before:absolute before:w-[2px] before:h-[2px]  before:bg-red-500 before:left-0 before:top-0 hover:before:w-full before:transition-all duration-500 after:absolute after:w-[2px] after:h-[2px]  before:opacity-0 hover:before:opacity-100 after:opacity-0 hover:after:opacity-100 after:bg-red-500 after:right-0 after:bottom-0 hover:after:w-full after:transition-all  flex items-center justify-center gap-4 before:delay-200  bg-gray-200/50 rounded-lg text-lg"
        >
            <span className="absolute opacity-0 group-hover:opacity-100 w-[2px] h-[2px]  bg-red-500 top-0 left-0 group-hover:h-full transition-all duration-900 delay-200"></span>
            <span className="absolute opacity-0 group-hover:opacity-100 w-[2px] h-[2px]  bg-red-500 bottom-0  right-0 group-hover:h-full transition-all duration-900"></span>
            <FcGoogle size={26} className="transform translate-x-24 group-hover:translate-x-0 transition-all duration-300" /> <span className=" transform translate-x-40 opacity-0 group-hover:opacity-100  group-hover:translate-x-0 group-hover:w-1/2 transition-all duration-300 delay-75">Sign in With Google</span>
        </motion.button>
    );
};

export default SocialLogin;

SocialLogin.propTypes = {
    onclick: PropTypes.function
}
