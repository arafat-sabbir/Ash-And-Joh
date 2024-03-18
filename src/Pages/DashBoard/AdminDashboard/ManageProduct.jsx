import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";

const ManageProduct = () => {
    const { allProduct } = useAllProduct()

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