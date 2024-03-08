import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";


const Home = () => {
    return (
        <div className="h-[300vh]">
            <div className="container">
                <Navbar />
            </div>
            <Banner />
        </div>
    );
};

export default Home;