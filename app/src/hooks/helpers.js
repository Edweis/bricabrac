// $Flow
import _ from 'lodash';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useSubscribedState = defaultState => {
  const [state, setState] = useState(defaultState);
  const prev = usePrevious(defaultState);
  useEffect(() => {
    if (!_.isEqual(defaultState, prev)) setState(defaultState);
  }, [defaultState, prev]);
  return [state, setState];
};

export const useFocusOnMount = dep => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref.current, dep]);
  return ref;
};
