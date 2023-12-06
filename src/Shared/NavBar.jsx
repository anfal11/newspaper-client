import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const NavBar = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [users, setUsers] = useState(null);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUserProfile({
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    });
  }, [user]);

  useEffect(() => {
    fetch(`https://newspaper-server-side.vercel.app/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const signOut = () => {
    logOut()
      .then(() => {
        toast.success("user signed out");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="navbar  fixed z-40 bg-opacity-30 bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
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
              {/* Navigation links */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/addArticle"
                className={({ isActive }) =>
                  isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
                }
              >
                Add Articles
              </NavLink>
              <NavLink
                to="/all-articles"
                className={({ isActive }) =>
                  isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
                }
              >
                All Articles
              </NavLink>
              <NavLink
                to="/subscription"
                className={({ isActive }) =>
                  isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
                }
              >
                Subscription
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/my-article"
                className={({ isActive }) =>
                  isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
                }
              >
                My Articles
              </NavLink>
              <NavLink
                to="/premium-article"
                className={({ isActive }) =>
                  isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
                }
              >
                Premium Articles
              </NavLink>
              <NavLink
                to="/userProfile"
                className={({ isActive }) =>
                  isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
                }
              >
                User Photo
              </NavLink>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">The Daily Nexus</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">
            {/* Navigation links */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/addArticle"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              Add Articles
            </NavLink>
            <NavLink
              to="/all-articles"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              All Articles
            </NavLink>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              Subscription
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/my-article"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              My Articles
            </NavLink>
            <NavLink
              to="/premium-article"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              Premium Articles
            </NavLink>
            <NavLink
              to="/userProfile"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              User Photo
            </NavLink>
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="flex items-center">
              <img
                className="rounded-full mr-3 w-16 h-16 lg:w-16 lg:h-16"
                src={
                  users
                    ? users.find((u) => u.email === user.email)?.image ||
                      user?.photoURL
                    : user?.photoURL
                }
                alt=""
              />
            </div>
          ) : (
            <></>
          )}
          {user?.email ? (
            <Link onClick={signOut} className="bg-white p-3">
              Logout
            </Link>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "p-3 rounded bg-blue-400 text-white" : "bg-white p-3"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
