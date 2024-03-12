const SecondaryButton = ({ title, className, ...rest }) => {
    return (
        <button
            {...rest}
            className={`group relative px-4 py-2 font-medium  transition-colors duration-[400ms] hover:text-main border-2 group-hover:border-0 ${className}`}
        >
            <span>{title}</span>

            {/* TOP */}
            <span className="absolute left-0 top-0 h-[2px] w-0 bg-main transition-all duration-100 group-hover:w-full" />

            {/* RIGHT */}
            <span className="absolute right-0 top-0 h-0 w-[2px] bg-main transition-all delay-100 duration-100 group-hover:h-full" />

            {/* BOTTOM */}
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-main transition-all delay-200 duration-100 group-hover:w-full" />

            {/* LEFT */}
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-main transition-all delay-300 duration-100 group-hover:h-full" />
        </button>
    );
};

export default SecondaryButton;
