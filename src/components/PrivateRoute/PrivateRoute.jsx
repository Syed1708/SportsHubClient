import React, { use } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({children}) {

  const location = useLocation();

    const {user, loading} = use(AuthContext);
    if (loading) {
      return <span className=' loading loading-infinity loading-xl'></span>
    }

    if(!user){
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    }
  return children;
    
  
}
