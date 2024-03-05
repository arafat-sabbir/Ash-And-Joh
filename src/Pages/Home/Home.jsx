import Banner from "@/Components/Banner/Banner";
import Navbar from "@/Components/Navbar/Navbar";


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