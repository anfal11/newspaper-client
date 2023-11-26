import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useAuth();
    if(loading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/login" />;
};

export default PrivateRoute;