import SecondaryButton from "@/Utils/AuthForm/SecondaryButton";
import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import { Link } from "react-router-dom";

const LatestArrival = () => {
   const { allProduct } = useAllProduct();
   return (
      <section className="flex flex-col items-center w-full h-full">
         <h1 className="text-3xl font-semibold text-center my-10">
            Latest Arrival
         </h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center lg:grid-cols-3 xl:grid-cols-3 w-full h-full">
            {allProduct?.map((product, index) => (
               <Link
                  state={product}
                  to={`/productDetail/${product._id}`}
                  key={index}
               >
                  <div className="w-full h-full bg-[#EEEDEB]  border-2 p-2  rounded-lg shadow-[0_0_30px_#E6E6E6] dark:bg-gray-800">
                     <img className="object-center w-11/12 h-11/12 mx-auto rounded-2xl" src={product.productImages[0]} alt="NIKE AIR" />
                  </div>
               </Link>
            ))}
         </div>
         <Link to={"/shop"} className="my-10">
            <SecondaryButton title={"See More"}></SecondaryButton>
         </Link>
      </section>
   );
};

export default LatestArrival;
