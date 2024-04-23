import SecondaryButton from "@/Utils/AuthForm/SecondaryButton";
import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const LatestArrival = () => {
   const { allProduct } = useAllProduct();
   return (
      <section className="flex flex-col items-center w-full h-full">
         <h1 className="text-3xl font-semibold text-center my-10">
            Latest Arrival
         </h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10 justify-items-center items-center justify-center lg:grid-cols-4 2xl:grid-cols-5 w-full h-full  ">
            {allProduct?.slice(0,10)?.map((product, index) => (
               <div key={index} className="w-[334px] h-[548px] relative bg-white  border-2 p-2  rounded-lg shadow-[0_0_30px_#E6E6E6] dark:bg-gray-800 py-20 hover:border-black transition-all duration-300">
                  <img className="object-center w-11/12 h-11/12 mx-auto rounded-2xl pb-12" src={product.productImages[0]} alt="NIKE AIR" />
                  <div className="absolute bottom-8 pt-2 left-4">
                     <h1 className="text-lg font-semibold mb-1">{product.productName}</h1>
                     <h1 className="text-xl font-semibold">TK {product.price}</h1>
                  </div>
                  <Link to={`/productDetail/${product._id}`} state={product}>
                     <h1 className="font-bold cursor-pointer bg-black p-2  rounded-full text-white absolute bottom-12 right-6"><RiShoppingBagLine size={26} /></h1>
                  </Link>
               </div>
            ))}
         </div>
         <Link to={"/shop"} className="my-10">
            <SecondaryButton title={"See All"}></SecondaryButton>
         </Link>
      </section>
   );
};

export default LatestArrival;
