import { useEffect, useState } from "react";

const useIsScrolled = () => {
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
    return { isScrolled }
};

export default useIsScrolled;