import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import AddArticles from "../Pages/Articles/AddArticles";
import AllArticles from "../Pages/Articles/AllArticles";
import Subscription from "../Pages/Subscription/Subscription";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyArticles from "../Pages/MyArticles/MyArticles";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import UserProfile from "../Pages/UserProfile/UserProfile";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import SingleDetailsPage from "../Component/SingleDetailsPage/SingleDetailsPage";
import UpdateProfile from "../Component/Update/UpdateProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-article",
        element: <AddArticles />,
      },
      {
        path: "/all-articles",
        element: <AllArticles />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/my-article",
        element: <MyArticles />,
      },
      {
        path: "/premium-article",
        element: <PremiumArticles />,
      },
      {
        path: "/userProfile",
        element: <UserProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/article/:id",
        element: <SingleDetailsPage />,
      },
      {
        path: "/update-profile/:id",
        element: <UpdateProfile />,
      }      
    ],
  },
]);
