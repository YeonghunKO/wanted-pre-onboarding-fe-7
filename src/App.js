import { Route, Routes } from 'react-router-dom';
import Todo from './page/Todo';
import * as ROUTES from './constants/routes';
import Auth from './page/Auth';

import * as React from 'react';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.AUTH} element={<Auth />} />
      <Route path={ROUTES.TODOS} element={<Todo />} />
    </Routes>
  );
}

export default App;
