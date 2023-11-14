import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import AddCustomer from "../../Pages/Dashboard/AddCustomer/AddCustomer";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ManageCustomer from "../../Pages/Dashboard/ManageCustomers/ManageCustomers";
import UpdateCustomerPayment from "../../Pages/Dashboard/UpdateCustomerPayment/UpdateCustomerPayment";
import Users from "../../Pages/Dashboard/Users/Users";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Revenuestatictis from "../../Pages/Dashboard/Revenuestatictis/Revenuestatictis";
import Expense from "../../Pages/Dashboard/Expense/Expense";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardLayout></DashboardLayout>
            },
            {
                path: '/',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/login',
                element: <Login></Login>
            }


            ,
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }

        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/users',
                element: <Users></Users>
            },
            {
                path: '/dashboard/manageexpense',
                element: <Expense></Expense>
            },

            {
                path: '/dashboard/addcustomer',
                element: <AddCustomer></AddCustomer>
            },
            {
                path: '/dashboard/managecustomer',
                element: <ManageCustomer></ManageCustomer>
            },
            // {
            //     path: '/dashboard/updatecustomerpayment',
            //     element:  <UpdateCustomerPayment></UpdateCustomerPayment> 
            // },

            {
                path: '/dashboard/revenuestatictis',
                element: <Revenuestatictis></Revenuestatictis>
            },
        ]
    }
    // {
    //     path: '/dashboard',
    //     element: <PrivateRoute><DashboardLayout></DashboardLayout> </PrivateRoute>,
    //     errorElement: <DisplayError></DisplayError>,
    //     children: [
    //             {
    //                 path: '/dashboard',
    //                 element: <Dashboard></Dashboard>
    //             },
    //             {
    //                 path: '/dashboard/users',
    //                 element: <AdminRoute><Users></Users></AdminRoute>
    //             },
    //             {
    //                 path: '/dashboard/manageexpense',
    //                 element: <AdminRoute> <Expense></Expense> </AdminRoute>
    //             },

    //             {
    //                 path: '/dashboard/addcustomer',
    //                 element: <AdminRoute> <AddCustomer></AddCustomer> </AdminRoute>
    //             },
    //             {
    //                 path: '/dashboard/managecustomer',
    //                 element: <AdminRoute> <ManageCustomer></ManageCustomer> </AdminRoute>
    //             },
    //             {
    //                 path: '/dashboard/updatecustomerpayment',
    //                 element: <AdminRoute> <UpdateCustomerPayment></UpdateCustomerPayment> </AdminRoute>
    //             },

    //             {
    //                 path: '/dashboard/revenuestatictis',
    //                 element: <AdminRoute> <Revenuestatictis></Revenuestatictis> </AdminRoute>
    //             },
    //             {
    //                 path: '/dashboard/payment/:id',
    //                 element: <Payment></Payment>,
    //                 loader: ({params}) => fetch(`https://dashboard-server-ndgk.onrender.com/booking/${params.id}`)

    //             }
    //     ]
    // }
])

export default router;