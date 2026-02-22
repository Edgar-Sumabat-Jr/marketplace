import React from 'react';
import { Route, Navigate } from 'react-router-dom';  // Using React Router v6 components
// import { useAuth } from '../context/AuthContext';  // Import useAuth

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useAuth();  // Get user and loading state from context

  // If loading is true, we can show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is no user (user is not authenticated), navigate to login
  if (!user) {
    return <Navigate to="/login" />;  // Redirect to login page
  }

  // If user is authenticated, render the protected component
  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
