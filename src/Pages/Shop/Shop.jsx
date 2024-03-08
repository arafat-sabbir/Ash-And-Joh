import { Link } from "react-router-dom";

const Shop = () => {
   return (
      <div className="text-center mx-auto">
         <h1 className="text-4xl mt-32">Coming Soon...</h1>
         <Link to={'/'} className="btn btn-primary mt-5">Go Home</Link>
      </div>
   );
};

export default Shop;