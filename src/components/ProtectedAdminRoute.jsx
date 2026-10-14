import React from 'react';
import { Navigate } from 'react-router-dom';

const getSessionData = () => {
    const itemStr = localStorage.getItem('admin_session');
    
    // 1. Check if item exists
    if (!itemStr) {
        return null;
    }
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    // 2. Check for expiration
    if (now.getTime() > item.expiry) {
        // Session expired: Clear localStorage and deny access
        localStorage.removeItem('admin_session');
        return null;
    }
    
    // 3. Session is valid
    return item.value;
};

const ProtectedAdminRoute = ({ children }) => {

  const isAuthenticated = getSessionData();

  
  if (!isAuthenticated) {

    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedAdminRoute;