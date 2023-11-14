import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

import Navber from '../Pages/Shared/Navber/Navber';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  // const [isAdmin] = useAdmin(user?.email)


  return (
    <div  >
      <Navber></Navber>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet></Outlet>


        </div>
        {
          user && <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80  text-base-content">




              <li> <Link to='/dashboard'>Dashboard</Link> </li>


              {

                <li> <Link to='/dashboard/users'>All Users</Link> </li>

              }
              {

                <li> <Link to='/dashboard/managecustomer'>Manage Customer</Link> </li>

              }
              {

                <li> <Link to='/dashboard/manageexpense'>Manage Expense</Link> </li>

              }

              {

                <li> <Link to='/dashboard/addcustomer'>Add a Customer</Link> </li>

              }
              {/*     
      {
        
        <li> <Link to= '/dashboard/updatecustomerpayment'>Update Customer Payment</Link> </li>
        
      } */}
              {

                <li> <Link to='/dashboard/revenuestatictis'>Revenue Statictis</Link> </li>

              }

            </ul>
            {/* <ul className="menu p-4 w-80  text-base-content">
      
      
      
        
        <li> <Link to= '/dashboard'>Dashboard</Link> </li>
        
      
      {
        
        <li> <Link to= '/dashboard/users'>All Users</Link> </li>
        
      }
      {
        
        <li> <Link to= '/dashboard/managecustomer'>Manage Customer</Link> </li>
        
      }
      {
        
        <li> <Link to= '/dashboard/manageexpense'>Manage Expense</Link> </li>
        
      }
    
      {
        
        <li> <Link to= '/dashboard/addcustomer'>Add a Customer</Link> </li>
        
      }
    
      {
        
        <li> <Link to= '/dashboard/updatecustomerpayment'>Update Customer Payment</Link> </li>
        
      }
      {
        
        <li> <Link to= '/dashboard/revenuestatictis'>Revenue Statictis</Link> </li>
        
      }
      
    </ul> */}

          </div>
        }
      </div>
    </div>
  );
};

export default DashboardLayout;