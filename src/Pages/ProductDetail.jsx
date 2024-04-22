import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md"
import { FiPlus, FiMinus } from "react-icons/fi";
import useAuth from '@/Hooks/useAuth';
import { AiOutlineLoading } from "react-icons/ai";
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { toast } from 'sonner';
import useCartProduct from '@/Utils/Hooks/Api/useCartProduct';
import ScrollToTop from '@/Utils/ScrollToTop';
const ProductDetail = () => {
    const axiosSecure = useAxiosSecure()
    const { state: productData } = useLocation()
    console.log(productData);
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { refetch } = useCartProduct()
    const [currentSlider, setCurrentSlider] = useState(0);
    const [selectedSize, setSelectedSize] = useState("")
    const [quantity, setQuantity] = useState(1)
    const { userData } = useAuth()
    ScrollToTop()
    const increaseQuantity = () => {
        if (quantity < productData.availAbleOnStock) {
            setQuantity(quantity + 1)
        }else{
            toast.error("Maximum Quantity Selected")
        }
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    const cartData = {
        quantity: parseInt(quantity),
        size: selectedSize,
        totalPrice: parseInt(productData.price * quantity),
        productData: productData._id,
        userId: userData._id
    }
    const addToCart = () => {
        if (!user) {
            return toast.error("Please Login To Add Product On Cart")
        }
        setLoading(true)
        const toastId = toast.loading("Product Adding To Cart")
        axiosSecure.put('/cart/addToCart', cartData)
            .then(res => {
                if (res.status === 200) {
                    refetch()
                    setLoading(false)
                    toast.success(res.message || "Product Added To Cart", { id: toastId })
                }
            })
            .catch(err => toast.success(err || "Error Adding Product to Cart", { id: toastId }))
    }
    return (
        <section className='grid sm:grid-cols-1 lg:grid-cols-2 justify-center gap-6 container border-2 divide-x-2 my-10 '>
            <div className=' text-center w-2/3'>
                <div className="flex border-2 flex-col items-center justify-center gap-5 lg:gap-10 bg-cover bg-top before:absolute before:inset-0 transform duration-400 ease-linear"
                >
                    <img src={productData.productImages[currentSlider]} alt="" />
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
            <div className='flex-1 px-5'>
                <h1 className='sm:text-xl md:text-3xl font-bold my-5'>{productData.productName}</h1>
                <p className='sm:text-sm md:text-xl mb-5'>{productData.description}</p>
                <h1 className='sm:text-xl md:text-2xl font-bold my-5 text-red-600'>ট {productData.price}</h1>
                <div className='grid md:grid-cols-6 lg:grid-cols-6 grid-cols-3 gap-4 items-center lg:w-1/2'>
                    <h1 className='sm:text-sm md:text-lg font-medium'>Size:</h1> {productData.availableSize.map((size, index) => <button onClick={() => setSelectedSize(size)} className={`btn rounded-full ${selectedSize === size ? "btn-neutral rounded-full" : "btn-outline rounded-full"}`} key={index}>{size}</button>)}
                </div>
                <h2 className="text-lg font-semibold mt-8 ">In Stock: {productData.availAbleOnStock}</h2>
                <div className='flex gap-4 my-10'>
                    <div className='border-2 w-[150px] py-3 flex items-center justify-center gap-3 '>
                        <button onClick={decreaseQuantity}><FiMinus size={18} /></button>
                        <span className='text-xl'>{quantity}</span>
                        <button onClick={increaseQuantity}><FiPlus />
                        </button>
                    </div>

                    <button onClick={addToCart} disabled={loading || !selectedSize} className='flex gap-1 disabled:bg-transparent border-2 w-[150px] py-3  items-center justify-center hover:bg-black hover:text-white disabled:hover:text-black transition-all duration-300'>Add To Cart {loading ? <AiOutlineLoading className='animate-spin' /> : <MdOutlineShoppingBag />}</button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
