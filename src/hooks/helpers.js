// $Flow
import { useState, useEffect } from 'react';

const useSubscribedState = (defaultState) => {
  const [state, setState] = useState(defaultState);
  useEffect(() => {
    setState(defaultState);
  }, [defaultState]);
  return [state, setState];
};

export default useSubscribedState;
