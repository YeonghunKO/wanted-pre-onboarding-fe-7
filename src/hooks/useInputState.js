import { useState } from 'react';

const useInputState = initVal => {
  const [value, setValue] = useState(initVal);
  const handleValue = e => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue('');
  };
  return [value, handleValue, reset];
};

export default useInputState;
