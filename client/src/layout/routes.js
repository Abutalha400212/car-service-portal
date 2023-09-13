import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Checkout from "../Components/Services/Checkout";
import Orders from "../Components/Services/Orders";
import Login from "../Components/shared/Login";
import Signup from "../Components/shared/Signup";
import PrivateRoute from "../routes/PrivateRoute";
import Main from "./Main";
import Success from "../Components/Home/payment/Success";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/checkout/:id",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/payment/success",
        element: <Success />,
      },
    ],
  },
]);
