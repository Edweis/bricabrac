import React, { useState } from 'react';
import { Input, InputProps } from 'react-native-elements';
import { useSubscribedState, useFocusOnMount } from '../hooks/helpers';

type ExcludeOnChangeText<T> = Pick<T, Exclude<keyof T, 'onChangeText'>>;
export type ValidationStrategy<T> = (text: string) => T | null;
export type Props<T> = ExcludeOnChangeText<InputProps> & {
  validator: ValidationStrategy<T>;
  onChangeText: (text: T) => void;
  focusOnMount: boolean;
};
function InputValidated<T>(props: Props<T>) {
  const { validator, value, onChangeText, focusOnMount, ...inputProps } = props;
  const [localValue, setLocalValue] = useSubscribedState(value);
  const [error, setError] = useState('');
  const focusOnMountRef = useFocusOnMount<Input>(focusOnMount);
  if (inputProps.errorMessage) {
    throw Error(
      'InputValidated recieved errorMessage props which will be overriden by the component.',
    );
  }

  const handleChange = (text: string) => {
    setLocalValue(text);
    const validText = validator(text);
    if (validText == null) setError('Invalide.');
    else {
      onChangeText(validText);
      setError('');
    }
  };

  return (
    <Input
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...inputProps}
      value={localValue}
      onChangeText={handleChange}
      errorMessage={error}
      ref={focusOnMountRef}
    />
  );
}

InputValidated.defaultProps = { focusOnMount: false };

export default InputValidated;
