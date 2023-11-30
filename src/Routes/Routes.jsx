import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import AllArticles from "../Pages/Articles/AllArticles";
import Subscription from "../Pages/Subscription/Subscription";
import MyArticles from "../Pages/MyArticles/MyArticles";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import UserProfile from "../Pages/UserProfile/UserProfile";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import SingleDetailsPage from "../Component/SingleDetailsPage/SingleDetailsPage";
import UpdateProfile from "../Component/Update/UpdateProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AddArticlePage from "../Pages/Articles/AddArticlePage";
import UpdateArticle from "../Component/Update/UpdateArticle";
import Dashboard from "../Pages/Dashboard/Dashboard"
import Payment from "../Component/Payment/Payment";
import PaymentHistory from "../Component/Payment/PaymentHistory";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Component/Admin/AdminHome";
import AllUsers from "../Component/Admin/AllUsers";
import AddPublisher from "../Component/Admin/AddPublisher";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addArticle",
        element: <PrivateRoute><AddArticlePage /></PrivateRoute>,
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
        path: "/my-article",
        element: <PrivateRoute><MyArticles /></PrivateRoute>,
      },
      {
        path: "/premium-article",
        element: <PremiumArticles />,
      },
      {
        path: "/userProfile",
        element: <PrivateRoute><UserProfile /></PrivateRoute>,
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
        element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
      },   
      {
        path: "/update-article/:id",
        element: <PrivateRoute><UpdateArticle /></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/articles/${params.id}`)
      }      
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      //normal user routes
        {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },

      //admin routes
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome/> </AdminRoute>,
      },
      {
        path: 'allArticles',
        element: <AdminRoute><AllArticles /></AdminRoute>,
      },
      {
        path: 'addPublisher',
        element: <AdminRoute><AddPublisher/></AdminRoute>,
      },
      // {
      //   path: 'updateItem/:id',
      //   element: <AdminRoute><UpdateItem /></AdminRoute>,
      //   loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
      // },
      {
        path: 'users',
        element:<AdminRoute><AllUsers /></AdminRoute>,
      }
    ]
  }
]);
