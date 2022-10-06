import { useEffect, useState } from 'react';

import * as ROUTES from '../../constants/routes';

import { useNavigate } from 'react-router-dom';
import { getItem } from '../../utils/storage';

function Todo() {
  const navigate = useNavigate();
  const [s, sets] = useState('');

  useEffect(() => {
    if (!getItem('token')) {
      navigate(ROUTES.AUTH, { replace: true });
    }
  });
  return <div>todo page</div>;
}

export default Todo;
