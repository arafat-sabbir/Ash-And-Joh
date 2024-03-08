import Banner from "@/Components/Banner/Banner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";

const Home = () => {
    return (
        <>
        <div className="h-[300vh]">
            <div className="container">
                <Navbar />
            </div>
            <Banner />
        </div>        
            <Footer></Footer>
        </>
    );
};

export default Home;