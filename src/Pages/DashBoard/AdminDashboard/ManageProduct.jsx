import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ManageProduct = () => {
    const { allProduct, isLoading, refetch } = useAllProduct()
    const axiosSecure = useAxiosSecure()
    const handleDeleteProduct = (id) => {
        toast('Are You Sure Want To Delete', {
            action: {
              label: 'Yes',
              button: "NO",
              onClick: () => {
                axiosSecure.delete(`/products/deleteProduct/${id}`).then((res) => {
                  if (res.status === 200) {
                    toast.success("Product deleted Successfully");
                    refetch();
                  }
                });
              },
            },
          });
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
            <div className="h-full w-full flex flex-col justify-center ">
                <div className="flex flex-col mb-10">
                    <h1 className="text-3xl font-semibold text-center mb-10 ml-14">
                        Manage All The Product
                    </h1>
                    <div className="flex flex-col lg:container max-w-[98vw] mx-auto">
                        <div className="overflow-x-auto border-2 rounded-xl">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Product Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Product Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Product Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            AvailAble Size
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {allProduct?.map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                <Link to={`/productDetail/${item._id}`} state={item}>
                                                    <img src={item.productImages[0]} className="w-16 cursor-pointer h-16 rounded-xl" alt="" /></Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                {item.price} Tk
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                {item.productName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {item.availableSize.map((size, index) => (
                                                    <span key={index} className="mr-2 p-[2px] rounded-md bg-gray-200">{size}</span>
                                                ))}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 flex space-x-2">
                                                <Link state={item} to={`/dashboard/editProduct/${item._id}`} className="p-2 rounded-full bg-green-700 text-white hover:bg-green-700 border-none"><FiEdit size={20} /> </Link>
                                                <button onClick={() => handleDeleteProduct(item._id)} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-500 border-none"><MdDeleteOutline size={20} /> </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;