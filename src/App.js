import { Route, Routes } from 'react-router-dom';
import Todo from './page/Todo';
import ProtectedRoute from './utils/ProtectedRoute';
import * as ROUTES from './constants/routes';
import Auth from './page/Auth';

import * as React from 'react';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Routes>
      <Route path={ROUTES.AUTH} element={<Auth />} />
      <Route
        path={ROUTES.TODOS}
        element={
          <ProtectedRoute token={token}>
            <Todo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
