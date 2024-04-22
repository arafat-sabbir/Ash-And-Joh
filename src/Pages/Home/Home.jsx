import Banner from "@/Components/Banner/Banner";
import Featured from "@/Components/Featured/Featured";
import LatestArrival from "@/Components/LatestArrival/LatestArrival";
import Newsletter from "@/Components/Newsletter/Newsletter";
const Home = () => {
   return (
      <div>
         <Banner></Banner>
         <div className="container ">
            <Featured />
         </div>
         <LatestArrival />
         <div className="container">
            <Newsletter />
         </div>
      </div>
   );
};

export default Home;
