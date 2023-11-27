import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Puff } from "react-loader-spinner";


const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useAuth();
    if(loading){
        return (
            
                <div className="flex justify-center items-center mt-10">
                <Puff
  height="80"
  width="80"
  radius={1}
  color="#4fa94d"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
                </div>
           
        )
    }

    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/login" />;
};

export default PrivateRoute;