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
                        <div className="bg p-4">
                            <img src={product.productImages[0]} alt="" />
                            <h1>{product.productName}</h1>
                        </div>
                        <div className="blob"></div>
                    </div>
                </Link>)}
            </div>
        </section>
    );
};

export default LatestArrival;