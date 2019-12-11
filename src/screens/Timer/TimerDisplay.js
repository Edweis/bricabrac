import React from 'react';
import { StyleSheet, Text } from 'react-native';

const pad = (n: number) => {
  return `0${n}`.slice(-2);
};
const formatTimer = (timer: number) => {
  const minutes = Math.floor(timer / 60);
  const formatedSeconds = pad(timer % 60);
  const fornatedHours = pad(Math.floor(minutes / 60));
  const formatedMinutes = pad(minutes % 60);
  return `${fornatedHours}:${formatedMinutes}:${formatedSeconds}`;
};

type Props = { timer: number };
export default (props: Props) => {
  return <Text>{formatTimer(props.timer)}</Text>;
};
