import { PropTypes } from "prop-types"
const Input = ({ name, type, onChange }) => {
  return <label className="relative">
    <input onChange={onChange} required placeholder="email" className="peer placeholder:text-transparent cursor-text w-full px-3 text-xl py-2 bg-white border-2 border-black rounded-lg focus:outline-none transition-all duration-300 focus:border-2 " type={type} name={name} />
    <span className="absolute left-3 -top-3.5 scale-90 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5   transition-all duration-300  bg-white z-10 transform  peer-focus:scale-90 text-xl text-gray-800 text-opacity-70">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
  </label>

}
export default Input;

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.function
}