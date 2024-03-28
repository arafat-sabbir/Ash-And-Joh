import { useEffect } from 'react'; // Import useEffect for side effects
import TableSkeleton from "@/Components/Skeleton/TableSkeleton";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCartProduct from "@/Utils/Hooks/Api/useCartProduct";
import { useState } from "react";
import { FiEdit, FiMinus, FiPlus } from "react-icons/fi";
import { MdOutlineCancel, MdPublishedWithChanges } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MyCart = () => {
  const { cartProduct, grandTotal, refetch, isLoading, isPending } = useCartProduct();
  const axiosSecure = useAxiosSecure();
  const [editableProductId, setEditableProductId] = useState(null); // Track editable product ID
  const [quantities, setQuantities] = useState({}); // Initialize quantities as an empty object
  const [loadingCart, setLoadingCart] = useState(true); // Add loading state for cart
  const [cancelEdit, setCancelEdit] = useState(true)

  // Use useEffect to update quantities when cartProduct changes
  useEffect(() => {
    if (cartProduct) {
      const initialQuantities = {};
      cartProduct.forEach(item => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantities(initialQuantities);
      setLoadingCart(false); // Set loadingCart to false when cartProduct is available
    }
  }, [cartProduct, cancelEdit]);

  const editQuantities = async (id) => {
    if (Object.prototype.hasOwnProperty.call(quantities, id)) {
      const quantity = quantities[id];
      const response = await axiosSecure.patch(`/cart/updateCartProduct/${id}`, { quantity });
      console.log(response.data);
      if (response.status === 200) {
        refetch()
        toast.success("Cart Updated SuccessFully");
      } else {
        toast.error("Error While Updating Product");
      }
      // Do whatever you need with the quantity here
    } else {
      console.log(`ID ${id} not found in quantities object`);
    }
  };

  const handleCancelEdit = () => {
    setCancelEdit(!cancelEdit)
  }

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };


  const deleteCartProduct = (id) => {
    toast('Are You Sure Want To Delete', {
      action: {
        label: 'Yes',
        button: "NO",
        onClick: () => {
          axiosSecure.delete(`/cart/deleteProduct/${id}`).then((res) => {
            if (res.status === 200) {
              toast.success("Product deleted Successfully");
              refetch();
            }
          });
        },
      },
    });
  };

  const toggleEdit = (productId) => {
    setEditableProductId(productId === editableProductId ? null : productId);
  };

  if (isLoading || isPending) { // Add loadingCart to condition
    return <TableSkeleton />;
  }

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="flex flex-col mb-10">
        <h1 className="text-3xl font-semibold text-center mb-10">Product On Your Cart</h1>
        <div className="flex flex-col lg:container max-w-[98vw] mx-auto">
          <div className="overflow-x-auto border-2 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {/* Table header */}
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Product Image</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Product Price</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Selected Size</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Table rows */}
                {cartProduct?.map((item) => (
                  <tr key={item._id}>
                    {/* Render product data */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {/* Product Image */}
                      <Link to={`/productDetail/${item._id}`} state={item.productData}>
                        <img src={item.productData.productImages[0]} className="w-16 cursor-pointer h-16 rounded-xl" alt="" />
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {/* Product Price */}
                      {item?.productData?.price} Tk
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {/* Selected Size */}
                      <span className='bg-gray-200 px-2 rounded-md'>{item.size}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {/* Quantity */}
                      <div className={`py-3 flex items-center justify-center gap-3 ${item._id === editableProductId ? "border rounded-md" : ""}`}>
                        {/* Decrease quantity button */}
                        {item._id === editableProductId && (
                          <button onClick={() => decreaseQuantity(item._id)}>
                            <FiMinus size={18} />
                          </button>
                        )}
                        <span className="text-lg bg-gray-200 px-2 rounded-md">{quantities[item._id] || item.quantity}</span>
                        {/* Increase quantity button */}
                        {item._id === editableProductId && (
                          <button onClick={() => increaseQuantity(item._id)}>
                            <FiPlus />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 flex gap-2">
                      {/* Edit/Publish button */}
                      {item._id === editableProductId ? (
                        <>
                          <button onClick={() => { toggleEdit(item._id); editQuantities(item._id); }} className="p-2 rounded-full bg-green-700 text-white hover:bg-green-700">
                            {item._id === editableProductId ? <IoIosCheckmarkCircleOutline size={20} /> : <FiEdit size={20} />}
                          </button>
                          <button onClick={() => { toggleEdit(item._id), handleCancelEdit(item._id) }} className="p-2 rounded-full bg-green-700 text-white hover:bg-green-700">
                            <MdOutlineCancel size={20} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => toggleEdit(item._id)} className="p-2 rounded-full bg-green-700 text-white hover:bg-green-700">
                            {item._id === editableProductId ? <MdPublishedWithChanges size={20} /> : <FiEdit size={20} />}
                          </button>
                          <button onClick={() => deleteCartProduct(item._id)} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-500">
                            <MdDeleteOutline size={20} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Total Price */}
            <div className="flex justify-between mb-2 pr-12 pl-5 border-t-2 py-2">
              <h1 className="text-xl font-medium">Total Price</h1>
              <h1 className="text-xl font-medium">{grandTotal} Tk</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;

