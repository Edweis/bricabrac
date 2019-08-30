import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Switch, TextInput, Picker } from 'react-native';
import { Text, Badge, Icon, Button, ButtonGroup } from 'react-native-elements';

type StatusT = 'accepted' | 'refused' | 'none';
type Props = {
  status: StatusT,
  setStatus: (StatusT) => void,
};
const mapStatustoLevel: { [StatusT]: string } = {
  accepted: 'success',
  refused: 'error',
  none: 'warning',
};
const translateStatus: { [StatusT]: string } = {
  accepted: 'acceptée',
  refused: 'réfutée',
  none: 'sans avis',
};
export default function Status(props: Props) {
  return (
    <Picker selectedValue={props.status} onValueChange={(value) => props.setStatus(value)}>
      {['accepted', 'refused', 'none'].map((value) => (
        <Picker.Item label={translateStatus[value]} value={value} key={value} />
      ))}
    </Picker>
  );
}
