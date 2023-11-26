import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signInWIthMail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    signInWIthMail(email, password)
      .then(() => {
        toast.success("User successfully logged in ");
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
    .then(res => {
      const user = res.user;
      const name = user?.displayName;
      const email = user?.email;
      const image = user?.photoURL;
      const userInfo = {name, email, image};
      axios.post('http://localhost:5000/users', userInfo)
      .then(() => {
        toast.success("User successfully logged in");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-36 sm:px-6 lg:px-8 h-screen">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-blue-400 sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Log in here and explore the world of gadgets!
          </p>

          <form
            onSubmit={handleLogin}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div className="relative">
              <input
                name="email"
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                
                </svg>
              </span>
            </div>

            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-blue-400 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign in
            </button>
            

            <p className="text-center text-sm text-gray-500">
              No account? &nbsp;
              <Link className="underline" to="/register">
                Sign up
              </Link>
            </p>
          </form>

          <button
          onClick={handleGoogleLogin}
              type="submit"
              className="flex items-center justify-center gap-6 w-full rounded-lg bg-blue-400 px-5 py-3 text-sm font-medium text-white lg:hover:bg-indigo-700"
            >
              <FcGoogle className="text-xl"></FcGoogle> Sign in with Google
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
