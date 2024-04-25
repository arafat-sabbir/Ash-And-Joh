const ShopProductSkeleton = () => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10 justify-items-center lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-10">
                {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className="w-[334px] h-[548px] relative bg-white border-2 p-2 rounded-lg shadow-[0_0_30px_#E6E6E6] dark:bg-gray-800 hover:border-black transition-all duration-300"
                    >
                        <div className="animate-pulse ">
                            <div className="bg-gray-200 h-60 w-full rounded-lg mb-4"></div>
                            <div className="mt-44">
                                <div className="bg-gray-200 h-8 w-3/4 rounded-full mb-4 "></div>
                                <div className="bg-gray-200 h-8 w-1/2 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopProductSkeleton;