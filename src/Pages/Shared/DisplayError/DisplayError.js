import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const DisplayError = () => {
    const {logOut} = useContext(AuthContext);
    const error = useRouteError();
    return (
        <div>
            <p className='text-3xl text-red-500'>Something went Wrong</p>
            <p className='text-3xl text-red-400'>{error.statusText || error.message}</p>
            <h4 className="text-3xl">Please <button onClick={logOut} >sign out</button> and log back in</h4>
        
        </div>
    );
};

export default DisplayError;