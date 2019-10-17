// @flow
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';

import Modal from 'react-native-modal';

type Props = { show: boolean, onClose: () => void, onSubmit: string => void };

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

export default function NewConceptModal(props: Props) {
  const [value, setValue] = useState('');
  const onSubmit = () => {
    if (value !== '') {
      props.onSubmit(value);
      props.onClose();
      setValue('');
    }
  };
  return (
    <Modal isVisible={props.show} onBackdropPress={props.onClose}>
      <View style={styles.content}>
        <Text h4>Nouveau concept</Text>
        <Input value={value} onChangeText={setValue} />
        <Button title="Créér" onPress={onSubmit} />
      </View>
    </Modal>
  );
}
