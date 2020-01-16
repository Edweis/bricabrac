// $Flow
import _ from 'lodash';
import { useState, useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    if (ref && ref.current) ref.current = value;
  }, [value]);
  return ref.current;
};

export const useSubscribedState = <T>(
  defaultState: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState(defaultState);
  const prev = usePrevious(defaultState);
  useEffect(() => {
    if (!_.isEqual(defaultState, prev)) setState(defaultState);
  }, [defaultState, prev]);

  return [state, setState];
};

interface FocusableT {
  focus: () => void;
  props?: { disabled?: boolean } | {};
}
export const useFocusOnMount = <T extends FocusableT>(
  dep?: boolean | string,
) => {
  const ref = useRef<T>(null);
  // On Android, focus on a disabled Input keep bluring. We need to track if the disabled prop changed
  // Moreover, we need to fetch again the disbled props inside the useEffect, thius we use a function to fetch it.
  const isDisabled = () => _.get(ref.current, 'props.disabled', false);
  useEffect(() => {
    if (ref.current != null && !isDisabled()) ref.current.focus();
  }, [ref.current == null, isDisabled(), dep]);
  return ref;
};
