import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import { Link } from "react-router-dom";

const LatestArrival = () => {
    const { allProduct } = useAllProduct()
    return (
        <section>
            <h1 className="text-3xl font-semibold text-center my-10">Latest Arrival</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center lg:grid-cols-3 xl:grid-cols-4">
                {allProduct?.map((product, index) => <Link state={product} to={`/productDetail/${product._id}`} className="  " key={index}>
                    <div key={index} className="card">
                        <div className="bg">
                            <img className="w-full min-h-[300px] rounded-md" src={product.productImages[0]} alt="" />
                            <h1 className="font-medium px-2 py-1 text-md">{product.productName}</h1>
                            <p className="font-semibold px-2 text-md">TK:{product.price}</p>

                        </div>
                        <div className="blob"></div>
                    </div>
                </Link>)}
            </div>
        </section>
    );
};

export default LatestArrival;