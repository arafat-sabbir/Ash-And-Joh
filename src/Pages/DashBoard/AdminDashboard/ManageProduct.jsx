import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import { toast } from "sonner";

const ManageProduct = () => {
    const { allProduct, isLoading, refetch } = useAllProduct()
    const axiosSecure = useAxiosSecure()
    const handleDeleteProduct = (id) => {
        const res = window.confirm("Are You Sure You Want To Delete This Product")
        if (res) {
            console.log(id);
            axiosSecure.delete(`/products/deleteProduct/${id}`)
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        refetch()
                        toast.success(res.data.message || "Product Deleted SuccessFully")
                    }
                })
        }
    }
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
                        <div className="bg">
                            <img src={product.productImages[0]} alt="" />
                            <h1>{product.productName}</h1>
                            <div className="flex justify-between">
                                <button className="btn">Edit</button>
                                <button className="btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>

                            </div>
                        </div>
                        <div className="blob"></div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageProduct;