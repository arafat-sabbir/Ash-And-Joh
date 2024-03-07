import useIsScrolled from "@/Hooks/useIsScrolled";

const Banner = () => {
    // Navbar Scroll Effect
    const { isScrolled } = useIsScrolled()
    console.log(isScrolled);

    return (
        <div style={{ backgroundImage: "url('https://i.ibb.co/Mh8xwVD/0137f97445a3f9d1ab9e5d7d211d087a.jpg')" }} className="bg-cover  bg-no-repeat h-[60vh] bg-center border-2 flex justify-center items-center">
            <h1 className={`${isScrolled ? " top-8 left-[220px] transition-all duration-2000  delay-50 " : "top-[40%] left-[50%]"} text-5xl overflow-hidden fixed text-red-500`}>Ash & Joh</h1>
        </div>

    );
};

export default Banner;