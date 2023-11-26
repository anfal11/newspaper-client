import { Link, NavLink, useNavigate } from "react-router-dom";
import  useAuth  from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const NavBar = () => {
    const {user, logOut} = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(()=> {
        setUserProfile({
            displayName: user?.displayName,
            photoURL: user?.photoURL,
        })
    }, [user])

    const signOut = () => {
        logOut()
        .then(() => {
          toast.success('user signed out');
          navigate('/');
        })
        .catch((error) => {
          toast.error(error.message);
        });
      }

  const nav = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        Home
      </NavLink>
      <NavLink
        to="/add-article"
        className={({ isActive }) => (isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        Add Articles
      </NavLink>
      <NavLink
        to="/all-articles"
        className={({ isActive }) => (isActive ?"p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        All Articles
      </NavLink>
      <NavLink
        to="/subscription"
        className={({ isActive }) => (isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        Subscription
      </NavLink>
      {/* todo: if user is admin */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/my-article"
        className={({ isActive }) => (isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        My Articles
      </NavLink>
      {/* todo: (If user taken Subscription) */}
      <NavLink
        to="/premium-article"
        className={({ isActive }) => (isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        Premium Articles
      </NavLink>
      <NavLink
        to="/userProfile"
        className={({ isActive }) => (isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        User Photo
      </NavLink>
    </>
  );

  return (
    <div>
      <div className="navbar  fixed z-40 bg-opacity-30 bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-4">
              {nav}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">The Daily Nexus</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">
            {nav}
          </ul>
        </div>
        <div className="navbar-end">
        {
            user?.email ? (
                <img className="rounded-full mr-3" src={userProfile?.photoURL} alt="" />
            ) : (
                <></>
            )
        }
        {
          user?.email ? (
            <Link
            onClick={signOut}
        className="bg-white p-3"
      >
        Logout
      </Link>
          ) : 
          (
            <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3")}
      >
        Login
      </NavLink>
            
          )
        }
        </div>
      </div>
    </div>
  );
};

export default NavBar;
