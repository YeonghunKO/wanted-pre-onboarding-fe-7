import React from 'react';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return React.cloneElement(children);
}

export default ProtectedRoute;
