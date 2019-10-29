// @flow
import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';

import Modal from 'react-native-modal';

type Props = {
  title: string,
  submitText: string,
  show: boolean,
  onClose: () => void,
  onSubmit: string => void
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
});

function ActionModal(props: Props) {
  const navigation = useContext(NavigationContext);
  const [value, setValue] = useState('');
  const onSubmit = () => {
    if (value !== '') {
      props.onSubmit(value, navigation);
      props.onClose();
      setValue('');
    }
  };
  return (
    <Modal isVisible={props.show} onBackdropPress={props.onClose}>
      <View style={styles.content}>
        <Text h4>{props.title}</Text>
        <Input value={value} onChangeText={setValue} />
        <Button title={props.submitText} onPress={onSubmit} />
      </View>
    </Modal>
  );
}

export default ActionModal;
