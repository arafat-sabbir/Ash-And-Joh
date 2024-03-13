import LatestArrival from "@/Components/LatestArrival/LatestArrival";
import Navbar from "@/Components/Navbar/Navbar";



const Home = () => {
    return (
        <div >
            <div className="h-[300vh]">
                <Navbar />
                <LatestArrival />
            </div>
        </div>
    );
};

export default Home;