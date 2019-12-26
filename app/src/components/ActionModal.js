import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useNavigation } from '../hooks/navigation';
import { useFocusOnMount } from '../hooks/helpers';

type Props = {
  title: string,
  submitText: string,
  show: boolean,
  onClose: () => void,
  onSubmit: (value: string) => void,
  multiline?: boolean,
  noInput?: boolean,
  children?: React.Node,
  defaultValue?: string,
  noCheck?: boolean,
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

function ActionModal(props: Props) {
  const navigation = useNavigation();
  const focusOnMountRef = useFocusOnMount(props.show);
  const { defaultValue, noInput, children, title, noCheck } = props;
  const [value, setValue] = useState(defaultValue);
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
          <Input
            value={value}
            onChangeText={setValue}
            multiline={props.multiline}
            ref={focusOnMountRef}
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
};

export default ActionModal;
