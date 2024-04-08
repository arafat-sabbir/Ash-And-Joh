import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCartProduct = () => {
    const axiosSecure = useAxiosSecure()
    const { data: cartData, refetch, isLoading, isPending } = useQuery({
        queryKey: ["cartProduct"],
        queryFn: async () => {
            const res = await axiosSecure.get("/cart/getCartProduct")
            return res.data.cartData;
        }
    })
    console.log(cartData);
    // const {cartProduct,grandTotal} = cartData;
    return { cartProduct: cartData?.cartProduct, grandTotal: cartData?.grandTotal, refetch, isLoading, isPending }
};

export default useCartProduct;