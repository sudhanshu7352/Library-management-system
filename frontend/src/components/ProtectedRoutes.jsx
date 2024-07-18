import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component}) => {
    const { user } = useContext(AuthContext);

    // return (
    //     <Route
    //         {...rest}
    //         render={(props) =>
    //             user ? <Component {...props} /> : <Navigate to="/login" />
    //         }
    //     />
    // );
    console.log("userdata :",user)
    return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
