// $Flow
import _ from 'lodash';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    if (ref && ref.current) ref.current = value;
  }, [value]);
  return ref.current;
};

export const useSubscribedState = <T>(defaultState: T) => {
  const [state, setState] = useState(defaultState);
  const prev = usePrevious(defaultState);
  useEffect(() => {
    if (!_.isEqual(defaultState, prev)) setState(defaultState);
  }, [defaultState, prev]);

  return [state, setState];
};

export const useFocusOnMount = (dep: ReadonlyArray<any>) => {
  const ref = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref.current, dep]);
  return ref;
};