import { NavLink } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
// import BsHouse, { BsCart4, BsPaypal } from "react-icons/bs";
// import { FaList, FaUtensils } from "react-icons/fa";
// import { MdArticle, MdReviews } from "react-icons/md";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const {user} = useAuth();
    console.log(isAdmin);
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Left Nav</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      {
                       isAdmin ? 
                       <>
                        <li>
                        <NavLink to="/dashboard/adminHome" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <BsHouse></BsHouse> */}
                            Admin Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addItems" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <FaUtensils></FaUtensils> */}
                            Add Items
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <FaList></FaList> */}
                            Manage Items
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/bookings" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        <FaBook></FaBook>
                            Manage Bookings
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/dashboard/users" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <MdReviews></MdReviews> */}
                            All Users
                        </NavLink>
                    </li>
                        </>
                        : 
                        <>
                        <li>
                        <NavLink to="/dashboard/userHome" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <BsHouse></BsHouse> */}
                            User Home
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/reservation" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        <BsCalendar></BsCalendar>
                            Reservation
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/dashboard/paymentHistory" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <BsPaypal></BsPaypal> */}
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <BsCart4></BsCart4> */}
                            My Cart 
                            {/* ({cart.length}) */}
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/review" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        <MdReviews></MdReviews>
                            Add Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myBookings" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        <BsList></BsList>
                            My Booking
                        </NavLink>
                    </li> */}
                        </>
                    }
                    {/* Shared Nav Links  */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <BsHouse></BsHouse> */}
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/all-articles" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        {/* <MdArticle></MdArticle> */}
                            Articles
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/order/contact" className="menu text-base lg:text-2xl p-5 text-black text-center">
                        <MdContactMail></MdContactMail>
                            Subs
                        </NavLink>
                    </li> */}
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default Dashboard;