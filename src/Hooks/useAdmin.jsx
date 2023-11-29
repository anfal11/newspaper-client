import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxios();
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res?.data?.admin;
        },
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;