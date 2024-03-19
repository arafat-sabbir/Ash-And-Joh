import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";

const ManageProduct = () => {
    const { allProduct, isLoading } = useAllProduct()
    if (isLoading) {
        const loadingCard = [1, 2, 3, 4, 5, 6, 7, 8]
        return <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 justify-center items-center justify-items-center">
            {loadingCard.map(item => <div key={item} className="card animate-pulse bg-gray-200">
                <div className="bg"></div>
                <div className="blob"></div>
            </div>)}
        </div>
    }

    return (
        <div>
            <h1>{allProduct?.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 justify-center items-center justify-items-center">
                {
                    allProduct.map((product, index) => <div key={index} className="card">
                        <div className="bg"></div>
                        <div className="blob"></div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageProduct;