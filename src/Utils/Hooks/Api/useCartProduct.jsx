import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCartProduct = () => {
    const axiosSecure = useAxiosSecure()
    const { data: cartProduct, refetch, isLoading, isPending } = useQuery({
        queryKey: ["cartProduct"],
        queryFn: async () => {
            const res = await axiosSecure.get("/cart/getCartProduct")
            return res.data.cartProduct;
        }
    })

    return { cartProduct, refetch, isLoading, isPending }
};

export default useCartProduct;