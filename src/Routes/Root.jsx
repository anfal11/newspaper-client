import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";

const Root = () => {
    return (
        <div>
        <NavBar></NavBar>
            <Outlet></Outlet>
            <div className="mt-10">
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;