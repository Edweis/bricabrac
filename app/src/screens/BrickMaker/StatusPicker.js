import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../constants/colors';
import { StatusT } from '../../constants/types';
import { translateStatus } from '../../constants/translations';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: { flexGrow: 1, marginLeft: 10, marginRight: 10 },
});

type Props = {
  status: StatusT,
  setStatus: (status: StatusT) => void,
};

export default function StatusPicker(props: Props) {
  return (
    <View style={styles.container}>
      {['accepted', 'none', 'refused'].map(value => (
        <Button
          key={value}
          onPress={() => props.setStatus(value)}
          title={translateStatus[value]}
          type={props.status === value ? 'solid' : 'outline'}
          buttonStyle={{
            backgroundColor:
              props.status === value
                ? colors.status[value]
                : colors.status.neutral,
          }}
          containerStyle={styles.item}
        />
      ))}
    </View>
  );
}
