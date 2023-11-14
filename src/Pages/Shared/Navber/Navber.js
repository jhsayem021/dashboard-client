import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const Navber = () => {

  const { user, logOut } = useContext(AuthContext);
  const menuItems = <React.Fragment>

    {
      user?.uid ?
        <>
          <button onClick={logOut} >Sign Out</button >
        </> :
        <li><Link to="/login">Sign in</Link></li>

    }
    {
      user?.displayName ?
        <li className=' ml-4 p-3 bg-accent text-white rounded-full uppercase font-bold' >{user?.displayName}</li> : <></>
    }

  </React.Fragment>

  return (
    <div>
      <div className="navbar bg-base-100 flex justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}

            </ul>
          </div>
          <Link to="/" className=" text-primary normal-case text-3xl font-bold ">New line BroadBand</Link>
        </div>
        <div className="navbar-center hidden lg:flex mt-14">
          <ul className="menu menu-horizontal px-1">
            {menuItems}

          </ul>

        </div>
        {
          user && <label tabIndex={2} htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
        }

      </div>
    </div>
  );
};

export default Navber;