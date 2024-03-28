import Featured from "@/Components/Featured/Featured";
import LatestArrival from "@/Components/LatestArrival/LatestArrival";
import Newsletter from "@/Components/Newsletter/Newsletter";
const Home = () => {
   return (
      <div>
         <div className="container ">
            <LatestArrival />
            <Featured />
            <Newsletter />
         </div>
      </div>
   );
};

export default Home;
