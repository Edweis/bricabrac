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
const TimerDisplay = (props: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>{formatTimer(props.timer)}</Text>
  </View>
);

export default TimerDisplay;
