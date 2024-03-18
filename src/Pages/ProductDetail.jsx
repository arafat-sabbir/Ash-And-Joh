import { useState } from 'react';

import { useLocation } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md"
import { FiPlus, FiMinus } from "react-icons/fi";
import useAuth from '@/Hooks/useAuth';

const ProductDetail = () => {
    const { state: productData } = useLocation()
    const [currentSlider, setCurrentSlider] = useState(0);
    const [selectedSize, setSelectedSize] = useState("L")
    const [quantity, setQuantity] = useState(1)
    const { userData } = useAuth()
    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    const cartData = {
        quantity,
        size: selectedSize,
        productId: productData._id,
        userId: userData._id
    }
    const addToCart = () => {
        console.log(cartData);
    }



    return (
        <section className='flex justify-center container border-2 divide-x-2'>
            <div className=' text-center w-2/3'>
                <div className='md:h-[700px] '>
                    <div className="w-full h-60 sm:h-96 flex md:h-full flex-col items-center justify-center gap-5 lg:gap-10 bg-cover bg-top before:absolute  before:inset-0 transform duration-400 ease-linear"
                    >
                        <img src={productData.productImages[currentSlider]} alt="" />
                    </div>
                </div>
                {/* slider container */}
                <div className="flex justify-center items-center gap-3 p-2">
                    {/* sliders */}
                    {productData.productImages.map((img, inx) => (
                        <img onClick={() => setCurrentSlider(inx)} key={inx}
                            src={img} className={`w-10 md:w-20 h-6 sm:h-8 md:h-12 bg-black/20 ${currentSlider === inx ? 'border-2 border-black p-px' : ''} rounded-md md:rounded-lg box-content cursor-pointer`}
                            alt={"product Image"} />
                    ))}
                </div>
            </div>
            <div className='flex-1'>
                <h1>{productData.productName}</h1>
                <div className='flex gap-4 items-center'>
                    <span className='text-2xl font-medium'>AvailAble Size</span> {productData.availableSize.map((size, index) => <button onClick={() => setSelectedSize(size)} className={`btn rounded-full ${selectedSize === size ? "btn-neutral" : "btn-outline "}`} key={index}>{size}</button>)}
                </div>
                <h1>ট {productData.price}</h1>
                <p>{productData.description}</p>
                <div className='flex gap-4'>
                    <div className='border-2 w-[150px] py-3 flex items-center justify-center gap-3 '><button onClick={decreaseQuantity}><FiMinus size={18} /></button> <span className='text-xl'>{quantity}</span> <button onClick={increaseQuantity}><FiPlus /></button> </div>
                    <button onClick={addToCart} className='flex gap-1 border-2 w-[150px] py-3  items-center justify-center hover:bg-black hover:text-white transition-all duration-300'>Add To Cart <MdOutlineShoppingBag /></button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
