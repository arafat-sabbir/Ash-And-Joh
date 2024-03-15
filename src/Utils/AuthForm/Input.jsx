import { PropTypes } from "prop-types"

const Input = ({ name, ...restAttribute }) => {
  return (
    <label className="relative">
      <input
        {...restAttribute}
        required
        placeholder={name || ""}
        className="peer placeholder:text-transparent cursor-pointer w-full px-3 text-lg py-2 bg-white border border-black rounded-lg focus:outline-none transition-all duration-300"
        name={name || ""}
      />
      <span
        className="absolute translate-x-3 left-0 -translate-y-3.5 scale-90 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:-translate-y-3.5 transition-all duration-300 bg-white z-10 transform peer-focus:scale-90 text-lg text-gray-800 text-opacity-70"
      >
        {name?.charAt(0).toUpperCase() + name?.slice(1)}
      </span>
    </label>
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
};
