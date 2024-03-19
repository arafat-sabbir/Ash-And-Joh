import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCartProduct from "@/Utils/Hooks/Api/useCartProduct";
// import { IoChevronForwardOutline } from "react-icons/io5";
// import { IoChevronBackOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";

const MyCart = () => {
    const { cartProduct, refetch } = useCartProduct()
    const axiosSecure = useAxiosSecure()
    const deleteCartProduct = (id) => {
        const toastId = toast.loading("Deleting Product")
        axiosSecure.delete(`/cart/deleteProduct/${id}`)
            .then(res => {
                if (res.status === 200) {
                    toast.success("Product deleted Successfully",{id:toastId})
                    refetch()
                }
            })
    }

    return (
        <div className="h-full w-full flex flex-col justify-center ">
            {cartProduct?.map((product, index) => <div key={index}>{console.log(product.productData)}</div>)}
            <div className="flex flex-col mb-10">
                <h1 className="text-3xl font-semibold text-center mb-10 ">
                    Product On Your Cart

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
                                        Property Image
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        property title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Property location
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        buyer email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        buyer name
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
                                {cartProduct?.map((item) => (
                                    <tr key={item._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            <img src={item.productData.productImages[0]} className="w-16 cursor-pointer h-16 rounded-xl" alt="" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {item.productData.productName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            {item.productData.price} Tk
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            {item.size}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            {item.productData.fabrics}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            <button onClick={() => deleteCartProduct(item._id)} className="btn bg-red-500 text-white hover:bg-red-500">Delete <MdDeleteOutline size={20} /> </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <p className="border-t w-full mb-2"></p> */}
                        {/* <div className="flex justify-between mb-2 px-2  ">
                            <button className=" px-4 py-2 font-semibold bg-gray-200 flex items-center"><IoChevronBackOutline />Prev</button>
                            <button className=" px-4 py-2 font-semibold bg-gray-200 flex items-center">Next<IoChevronForwardOutline /></button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCart;