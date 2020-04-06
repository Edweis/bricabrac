import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Text, InputProps } from 'react-native-elements';
import Modal from 'react-native-modal';
import _ from 'lodash';
import { useNavigation, NavigationProp } from '../hooks/navigation';
import InputValidated, { ValidationStrategy } from './InputValidated';
import { useSubscribedState } from '../hooks/helpers';

type Props<T> = {
  title: string;
  submitText: string;
  show: boolean;
  onClose: () => void;
  onSubmit: (value: T, nav: NavigationProp) => void;
  multiline?: boolean;
  noInput?: boolean;
  children?: JSX.Element | JSX.Element[] | null;
  defaultValue: T;
  noCheck?: boolean;
  inputProps: Partial<InputProps>;
  validator: ValidationStrategy<T>;
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  children: {
    display: 'flex',
  },
  title: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function ActionModal<T>(props: Props<T>) {
  const navigation = useNavigation();
  const { defaultValue, noInput, children, title, noCheck, validator } = props;
  const [value, setValue] = useSubscribedState<T>(defaultValue);
  const onSubmit = () => {
    if (noInput || noCheck || value !== defaultValue) {
      props.onClose();
      props.onSubmit(value, navigation);
      setValue(defaultValue);
    }
  };

  // avoid to load it when unused
  if (!props.show) return null;

  return (
    <Modal isVisible={props.show} onBackdropPress={props.onClose}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text h4>{title}</Text>
        </View>
        {children && <View>{children}</View>}
        {!noInput && (
          <InputValidated
            // eslint-disable-next-line
            {...props.inputProps}
            value={_.toString(value)}
            validator={validator}
            multiline={props.multiline}
            onChangeText={(text: T) => setValue(text)}
            focusOnMount
          />
        )}
        <View style={styles.title}>
          <Button title={props.submitText} onPress={onSubmit} />
        </View>
      </View>
    </Modal>
  );
}

ActionModal.defaultProps = {
  multiline: false,
  noInput: false,
  children: null,
  defaultValue: '',
  noCheck: false,
  inputProps: {},
  validator: (text: string) => text,
} as Partial<Props<string>>;

export default ActionModal;
