import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import { Link } from "react-router-dom";

const Shop = () => {
   const { allProduct } = useAllProduct();
   return (
      <section>
         {/* <div className="w-full h-96 bg-no-repeat" style={{ backgroundImage: "url('https://d1csarkz8obe9u.cloudfront.net/posterpreviews/custom-t-shirts-banner-design-template-4900533935ea094ef9a9b73571605d04_screen.jpg?ts=1686050363')" }}>
         </div> */}
         <h1 className="text-3xl font-semibold text-center my-10">
            All Collections
         </h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center lg:grid-cols-3 xl:grid-cols-4 my-20">
            {allProduct?.map((product, index) => (
               <Link
                  state={product}
                  to={`/productDetail/${product._id}`}
                  className="  "
                  key={index}
               >
                  <div key={index} className="card">
                     <div className="bg">
                        <img
                           className="w-full min-h-[300px] rounded-md"
                           src={product.productImages[0]}
                           alt=""
                        />
                        <h1 className="font-medium px-2 py-1 text-md">
                           {product.productName}
                        </h1>
                        <p className="font-semibold px-2 text-md">
                           TK:{product.price}
                        </p>
                     </div>
                     <div className="blob"></div>
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

export default Shop;
