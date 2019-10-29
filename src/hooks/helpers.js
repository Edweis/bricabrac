// $Flow
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

export const useSubscribedState = defaultState => {
  const [state, setState] = useState(defaultState);
  useEffect(() => {
    setState(defaultState);
  }, [defaultState]);
  return [state, setState];
};

export const useFocusOnMount = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref.current]);
  return ref;
};
