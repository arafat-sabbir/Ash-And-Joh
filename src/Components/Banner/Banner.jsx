import { useEffect, useState } from "react";

const Banner = () => {
    // Navbar Scroll Effect
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if the user has scrolled down
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        // Attach the event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{ backgroundImage: "url('https://i.ibb.co/Mh8xwVD/0137f97445a3f9d1ab9e5d7d211d087a.jpg')" }} className="bg-cover  bg-no-repeat h-[60vh] bg-center border-2 flex justify-center items-center">
            <h1 className="text-5xl overflow-hidden text-amber-900 sticky top-6 left-6 ">Ash & Joh</h1>
        </div>

    );
};

export default Banner;