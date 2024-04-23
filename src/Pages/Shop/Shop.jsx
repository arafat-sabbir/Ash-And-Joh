import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import ScrollToTop from "@/Utils/ScrollToTop";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import ShopProductSkeleton from "./ShopProductSkeleton";

const Shop = () => {
   const axiosSecure = useAxiosSecure()
   const [currentPage, setCurrentPage] = useState(1);
   const productPerPage = 10;
   useEffect(() => {
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
   }, [currentPage])
   const skip = (currentPage - 1) * productPerPage;
   const { data: shopProduct, isLoading, isError, isPending } = useQuery({
      queryKey: ["shopProduct", currentPage],
      queryFn: async () => {
         const res = await axiosSecure.get(`/products/shopProduct?skip=${skip}&limit=${productPerPage}`);
         return res.data;
      }
   })

   if (isLoading || isPending || isError) {
      return <ShopProductSkeleton />
   }

   const productCount = shopProduct.totalProducts;
   const numberOfPage = Math.ceil(productCount / productPerPage);
   const totalPages = [...Array(numberOfPage).keys()];
   return (
      <section>
         <h1 className="text-3xl font-semibold text-center my-10">
            All Collections
         </h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10 justify-items-center lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-10">
            {shopProduct?.data?.map((product, index) => (
               <Link
                  state={product}
                  to={`/productDetail/${product._id}`}
                  className="  "
                  key={index}
               >
                  <div key={index} className="w-[334px] h-[548px] relative bg-white  border-2 p-2  rounded-lg shadow-[0_0_30px_#E6E6E6] dark:bg-gray-800 hover:border-black transition-all duration-300">
                     <img className="object-center w-11/12 h-11/12 mx-auto rounded-2xl pb-12" src={product.productImages[0]} alt="NIKE AIR" />
                     <div className="absolute bottom-8 pt-2 left-4">
                        <h1 className="text-lg font-semibold mb-1">{product.productName}</h1>
                        <h1 className="text-xl font-semibold">TK {product.price}</h1>
                     </div>
                     <Link to={`/productDetail/${product._id}`} state={product}>
                        <h1 className="font-bold cursor-pointer bg-black p-2  rounded-full text-white absolute bottom-12 right-6"><RiShoppingBagLine size={26} /></h1>
                     </Link>
                  </div>
               </Link>
            ))}
         </div>
         {/* Pagination */}
         <div className="flex justify-center items-center gap-3 mb-10">
            {
               totalPages.map(page =>
                  <button key={page}
                     onClick={() => setCurrentPage(page + 1)}
                     className={`border-[1px] border-gray-300 w-[35px] h-[35px] hover:bg-main hover:text-white duration-300 font-medium ${currentPage === page + 1 ? 'bg-main text-white' : 'bg-white text-main'}`}>
                     {page + 1}
                  </button>)
            }
         </div>
      </section>
   );
};

export default Shop;
