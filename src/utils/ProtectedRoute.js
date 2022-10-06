import React from 'react';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return React.cloneElement(children);
}

export default ProtectedRoute;
