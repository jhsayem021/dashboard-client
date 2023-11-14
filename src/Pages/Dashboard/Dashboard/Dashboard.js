import React, { useContext } from 'react';
import DefaultDashboard from '../DefaultDashboard/DefaultDashboard';
import Login from '../../Login/Login';
import { AuthContext } from '../../../Context/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            {
                user && <DefaultDashboard></DefaultDashboard>
            }
            {
                !user && <Login></Login>
            }


        </div>
    );
};

export default Dashboard;