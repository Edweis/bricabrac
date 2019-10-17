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
    if (!ref.current)
      throw Error("useFocusOnMount's ref has not been assigned.");
    ref.current.focus();
  }, [ref.current]);
  return ref;
};
