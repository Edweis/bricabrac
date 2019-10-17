import React from 'react';
import { Picker } from 'react-native';
import type { StatusT } from '../../constants/types';
import { translateStatus } from '../../constants/translations';

type Props = {
  status: StatusT,
  setStatus: StatusT => void
};

export default function StatusPicker(props: Props) {
  return (
    <Picker
      selectedValue={props.status}
      onValueChange={value => props.setStatus(value)}
    >
      {['accepted', 'refused', 'none'].map(value => (
        <Picker.Item label={translateStatus[value]} value={value} key={value} />
      ))}
    </Picker>
  );
}
