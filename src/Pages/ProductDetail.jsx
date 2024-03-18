import { useState } from 'react';

import { useLocation } from "react-router-dom";

const ProductDetail = () => {
    const { state } = useLocation()
    const [currentSlider, setCurrentSlider] = useState(0);
    return (
        <section className='flex justify-center container border-2'>
            <div className=' text-center w-2/3'>
                <div className='md:h-[700px] '>
                    <div className="w-full h-60 sm:h-96 flex md:h-full flex-col items-center justify-center gap-5 lg:gap-10 bg-cover bg-top before:absolute  before:inset-0 transform duration-400 ease-linear"
                    >
                        <img src={state.productImages[currentSlider]} alt="" />
                    </div>
                </div>
                {/* slider container */}
                <div className="flex justify-center items-center gap-3 p-2">
                    {/* sliders */}
                    {state.productImages.map((img, inx) => (
                        <img onClick={() => setCurrentSlider(inx)} key={inx}
                            src={img} className={`w-10 md:w-20 h-6 sm:h-8 md:h-12 bg-black/20 ${currentSlider === inx ? 'border-2 border-black p-px' : ''} rounded-md md:rounded-lg box-content cursor-pointer`}
                            alt={"product Image"} />
                    ))}
                </div>
            </div>
            <div className='flex-1'>
                <h1>  From Product Detail {state.productName}</h1>
            </div>
        </section>
    );
};

export default ProductDetail;
