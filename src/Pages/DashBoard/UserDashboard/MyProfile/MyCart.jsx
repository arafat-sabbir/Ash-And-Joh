import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCartProduct from "@/Utils/Hooks/Api/useCartProduct";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";

const MyCart = () => {
  const { cartProduct, refetch, isLoading, isPending } = useCartProduct()
  const axiosSecure = useAxiosSecure()
  const deleteCartProduct = (id) => {
    const toastId = toast.loading("Deleting Product")
    axiosSecure.delete(`/cart/deleteProduct/${id}`)
      .then(res => {
        if (res.status === 200) {
          toast.success("Product deleted Successfully", { id: toastId })
          refetch()
        }
      })
  }
  if (isLoading || isPending) {
    return (
      <div>
          <div className="animate-pulse flex flex-col justify-center">
            {/* Placeholder for cart products */}
            <div className="mb-10">
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
                          Selected Size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Quantity
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
                      {/* Placeholder for each cart item */}
                      {[1, 2, 3].map((index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            <div className="w-16 h-16 bg-gray-300 rounded-xl"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            <div className="w-24 h-4 bg-gray-300 rounded"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            <div className="w-12 h-4 bg-gray-300 rounded"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            <div className="w-12 h-4 bg-gray-300 rounded"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            <div className="w-20 h-8 bg-gray-300 rounded"></div>
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
  }

  const grandTotalPrice = cartProduct.reduce((total, item) => total + item.totalPrice, 0);
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
                    Selected Size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Quantity
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {item.productData.price} Tk
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {item.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      <button onClick={() => deleteCartProduct(item._id)} className="btn bg-red-500 text-white hover:bg-red-500">Delete <MdDeleteOutline size={20} /> </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mb-2 pr-12 border-t-2 py-2">
              <h1>Total Price</h1>
              <h1 className="text-xl font-medium">{grandTotalPrice}Tk</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;