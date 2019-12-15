import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { StatusT } from '../constants/types';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  accepted: { backgroundColor: colors.status.accepted },
  refused: { backgroundColor: colors.status.refused },
  none: { backgroundColor: colors.status.none },
  marginRight: { marginRight: 10 },
});

type Props = { status: StatusT, marginRight?: boolean };
function Status({ status, marginRight }: Props) {
  const myStyles = [styles.dot, styles[status]];
  if (marginRight) myStyles.push(styles.marginRight);
  return <View style={myStyles} />;
}
Status.defaultProps = { marginRight: false };
export default Status;
