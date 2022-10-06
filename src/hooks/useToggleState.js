import { useState } from 'react';

export default function useToggleState(initalState = false) {
  const [state, setState] = useState(initalState);
  const handleState = () => {
    setState(!state);
  };

  const reset = () => {
    setState(false);
  };

  return [state, handleState, reset];
}
