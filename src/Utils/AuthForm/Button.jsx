import { FaUserLarge } from "react-icons/fa6";
import { PropTypes } from "prop-types"

const Button = ({ title, image, Icon, className, onClick }) => {
    return <button onClick={onClick}
        className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-400 shadow-lg hover:w-32 hover:rounded-lg "
    >
        <div
            className={`flex items-center justify-center w-full transition-all duration-700 group-hover:justify-start group-hover:pl-3`}
        >
            {image ? (
                <img src={image} alt="User" />
            ) : (
                Icon ? (
                    <Icon className={` text-white ${className}`} size={20} />
                ) : (
                    <FaUserLarge className="text-white" size={20} />
                )
            )}

        </div>
        <div
            className="absolute right-3 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
            {title}
        </div>
    </button>

}
export default Button;

Button.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
}