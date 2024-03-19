import useAxios from '@/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllProduct = () => {
    const axiosPublic = useAxios()
    const { data: allProduct, refetch, isLoading, isPending } = useQuery({
        queryKey: ["allProduct"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/getAllProduct`)
            return res.data.data;
        }
    })

    return { allProduct, refetch, isLoading, isPending }
};

export default useAllProduct;