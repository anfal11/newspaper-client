import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";


const useCart = () => {
    const axiosSecure = useAxios();
    const {user} = useAuth();
    const { refetch,  data: cart = [] } = useQuery({
        queryKey: ['cart', !!user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart?email=${user?.email}`);
            return res.data;
          },
      })
    return [cart, refetch];
    
};

export default useCart;