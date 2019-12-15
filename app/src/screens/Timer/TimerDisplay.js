import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatTimer } from './helpers';

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 32,
  },
  text: { fontSize: 42 },
});

type Props = { timer: number };
export default (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTimer(props.timer)}</Text>
    </View>
  );
};
