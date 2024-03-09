import Navbar from "@/Components/Navbar/Navbar";
import { Link } from "react-router-dom";

const Shop = () => {
   return (
      <div className="mx-auto">
         <Navbar />
         <h1 className="text-4xl mt-20 text-center">Coming Soon...</h1>
         <div className="text-center my-10">
            <Link to={'/'}>
            <button className="btn btn-outline">Go Back</button>
            </Link>
         </div>
      </div>
   );
};

export default Shop;