import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { Puff } from "react-loader-spinner";

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    
    if(loading || isAdminLoading){
        return <>

        <div className="h-screen flex justify-center items-center">
        <Puff color="#00BFFF" height={100} width={100} />
        </div>
        </>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace />
};

export default AdminRoute;