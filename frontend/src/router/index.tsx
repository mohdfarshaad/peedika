import { createBrowserRouter } from "react-router";

import ProductDetails from "../pages/store/ProductDetails";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Categories from "../pages/admin/Categories";
import StoreLayout from "../layouts/StoreLayout";
import AdminLayout from "../layouts/AdminLayout";
import { Home } from "../pages/store/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Customers from "../pages/admin/Customers";
import Orders from "../pages/admin/Orders";
import Settings from "../pages/admin/Settings";

export const router = createBrowserRouter([
  // -------------------------
  // PUBLIC STORE
  // -------------------------
  {
    path: "/",
    element: <StoreLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
    ],
  },

  // -------------------------
  // AUTH
  // -------------------------
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // -------------------------
  // PROTECTED ADMIN
  // -------------------------
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "customers",
            element: <Customers />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
