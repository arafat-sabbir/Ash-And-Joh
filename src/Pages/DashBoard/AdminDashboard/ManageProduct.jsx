import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAllProduct from "@/Utils/Hooks/Api/useAllProduct";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { toast } from "sonner";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { Link } from "react-router-dom";
import TableSkeleton from "@/Components/Skeleton/TableSkeleton";

const ManageProduct = () => {
    const { allProduct, isLoading, refetch } = useAllProduct()
    const axiosSecure = useAxiosSecure()
    const handleToggleFeatured = (id) => {
        axiosSecure.patch(`/products/toggleFeatured/${id}`).then((res) => {
            if (res.status === 200) {
                toast.success("Product Status Changed Successfully");
                refetch();
            }
        });
    }
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
        return <TableSkeleton />
    }
    return (
        <div className="h-full w-full  flex flex-col justify-center ">
            <div className="flex flex-col mb-10">
                <h1 className="text-3xl font-semibold text-center mb-10 ml-14">
                    Manage All The Product
                </h1>
                <div className="flex flex-col shadow-[0_0_50px_#D1CECD] rounded-lg p-6 lg:container max-w-[98vw] mx-auto">
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
                                        Featured Product
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
                                        <td className=" whitespace-nowrap text-center text-sm font-medium  text-gray-800 dark:text-gray-200">
                                            {item.availableSize.map((size, index) => (
                                                <span key={index} className="mr-2 p-[2px] rounded-md bg-gray-200">{size}</span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 cursor-pointer">
                                            {item.featured ? <button onClick={() => handleToggleFeatured(item._id)} className="text-yellow-500"><GoStarFill size={26} /></button> : <button onClick={() => handleToggleFeatured(item._id)} ><GoStar size={26} /></button>}
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
    );
};

export default ManageProduct;