import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { GrArticle } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { BsCart4, BsHouse, BsPaypal } from "react-icons/bs";
import { MdOutlineUpload } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import useCart from "../../Hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  return (
    <div>
      <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn m-4 bg-blue-500 drawer-button lg:hidden"
          >
            <CiMenuBurger className="text-2xl text-white font-bold" />
          </label>
          <div>
              <Outlet />
      </div>
        </div>
        
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/adminHome"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <BsHouse></BsHouse>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <FaUserAlt></FaUserAlt>
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allArticles"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <GrArticle></GrArticle>
                    All Articles
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addPublisher"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <MdOutlineUpload></MdOutlineUpload>
                    Add Publisher
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard/userHome"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <BsHouse></BsHouse>
                    User Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <BsPaypal></BsPaypal>
                    Payment History
                  </NavLink>
                </li>
                <li>
                        <NavLink to="/dashboard/cart" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        <BsCart4></BsCart4>
                            My Cart ({cart.length})
                        </NavLink>
                    </li>
              </>
            )}
            {/* Shared Nav Links  */}
            <div className="divider"></div>
            <li>
              <NavLink
                to="/"
                className="menu text-base lg:text-2xl p-5 text-black text-center"
              >
                <BsHouse></BsHouse>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-articles"
                className="menu text-base lg:text-2xl p-5 text-black text-center"
              >
                <FaUserAlt></FaUserAlt>
                Articles
              </NavLink>
            </li>
          </ul>
        
        </div>
        
      </div>
      </div>
      
      
    </div>
  );
};

export default Dashboard;
