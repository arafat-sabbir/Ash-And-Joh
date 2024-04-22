import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Banner.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Banner = () => {
    const coffeeImg = "https://i.ibb.co/DVS5N0n/379733b4-d386-4089-912e-b4231c2b9630.png";
    const pizzaImg = "https://i.ibb.co/mRGw4ML/caa1f5a5-7fa6-41b3-bdfc-449cc5d02e0b.png";
    const burgerImg = "https://i.ibb.co/sWcdcgs/83b4022e-6ffb-45f4-bb5c-ca476e66f1e8.png";
    const animate1 = useRef(null);
    const isInView1 = useInView(animate1);
    const properties = {
        prevArrow: (
            <button className="button-style">
                <FaAngleLeft />
            </button>
        ),
        nextArrow: (
            <button className="button-style">
                <FaAngleRight />
            </button>
        ),
    };

    return (
        <Zoom {...properties} scale={1.4} className="">
            <div className="each-slide-effect">
                <div className="flex w-11/12 mx-auto">
                    <div className="flex-1" ref={animate1}  style={{
                                transform: isInView1 ? "none" : "translateY(-90px)",
                                opacity: isInView1 ? "1" : "0",
                                transition: "all 1.5s",
                            }}>
                        <span className="container flex flex-col justify-center items-center">
                            <h3 className="-z-0 text-[80px] md:text-9xl font-fancy text-lightMain text-center">
                                Ash & Joh
                            </h3>
                            <h2 className="mt-[-75px] md:mt-[-80px] text-[90px] md:text-[130px] z-50 font-extrabold text-center text-slate-600 uppercase">
                                T-Shirt
                            </h2>
                            <p className="text-slate-700 font-heading text-center mt-[-20px] w-[90%] lg:w-[60%] mb-5">
                                Find Your Best Fit On Us
                            </p>
                            <Link to="/shop">
                                {" "}
                                <button className="text-slate-600 font-medium border-2 uppercase font-heading text-xl border-black px-5 py-2 tracking-[4px] hover:text-white hover:bg-black duration-500">
                                    Shop
                                </button>
                            </Link>
                        </span>
                    </div>
                    <div className="flex-1" ref={animate1}  style={{
                                transform: isInView1 ? "none" : "translateY(90px)",
                                opacity: isInView1 ? "1" : "0",
                                transition: "all 0.7s",
                                transitionDelay:"0.5s"
                            }}>
                        <img src={coffeeImg} alt="" />
                    </div>
                </div>
            </div>
            <div className="each-slide-effect">
                <div className="flex w-11/12 mx-auto">
                    <div className="flex-1">
                        <span className="container flex flex-col justify-center items-center">
                            <h3 className="-z-0 text-[80px] md:text-9xl font-fancy text-lightMain text-center">
                                Ash & Joh
                            </h3>
                            <h2 className="mt-[-75px] md:mt-[-80px] text-[90px] md:text-[130px] z-50 font-extrabold text-center text-slate-600 uppercase">
                                T-Shirt
                            </h2>
                            <p className="text-slate-700 font-heading text-center mt-[-20px] w-[90%] lg:w-[60%] mb-5">
                                Find Your Best Fit On Us
                            </p>
                            <Link to="/shop">
                                {" "}
                                <button className="text-slate-600 font-medium border-2 uppercase font-heading text-xl border-black px-5 py-2 tracking-[4px] hover:text-white hover:bg-black duration-500">
                                    Shop
                                </button>
                            </Link>
                        </span>
                    </div>
                    <div className="flex-1">
                        <img src={burgerImg} alt="" />
                    </div>
                </div>
            </div>
            <div className="each-slide-effect">
                <div className="flex w-11/12 mx-auto">
                    <div className="flex-1">
                        <span className="container flex flex-col justify-center items-center">
                            <h3 className="-z-0 text-[80px] md:text-9xl font-fancy text-lightMain text-center">
                                Ash & Joh
                            </h3>
                            <h2 className="mt-[-75px] md:mt-[-80px] text-[90px] md:text-[130px] z-50 font-extrabold text-center text-slate-600 uppercase">
                                T-Shirt
                            </h2>
                            <p className="text-slate-700 font-heading text-center mt-[-20px] w-[90%] lg:w-[60%] mb-5">
                                Find Your Best Fit On Us
                            </p>
                            <Link to="/shop">
                                {" "}
                                <button className="text-slate-600 font-medium border-2 uppercase font-heading text-xl border-black px-5 py-2 tracking-[4px] hover:text-white hover:bg-black duration-500">
                                    Shop
                                </button>
                            </Link>
                        </span>
                    </div>
                    <div className="flex-1">
                        <img src={pizzaImg} alt="" />
                    </div>
                </div>
            </div>
        </Zoom>
    );
};

export default Banner;
