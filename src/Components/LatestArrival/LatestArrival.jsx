import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import { Link } from "react-router-dom";

const LatestArrival = () => {
    const { allProduct, isLoading, refetch } = useAllProduct()
    console.log(allProduct, isLoading);
    return (
        <section>
            <h1 className="text-3xl font-semibold text-center my-10">Latest Arrival</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 xl:grid-cols-4">
                {allProduct?.data?.map((product, index) => <Link state={product} to={`/productDetail/${product._id}`} className="bg-white border-2 hover:border-black transition-all duration-300 rounded-md  h-[537px] w-[325px] p-4 " key={index}>
                    <img src={product.productImages[0]} alt="" />
                    <h1>{product.productName}</h1>
                </Link>)}
            </div>
        </section>
    );
};

export default LatestArrival;