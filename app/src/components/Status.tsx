import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusT } from '../constants/types';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  [StatusT.accepted]: { backgroundColor: colors.status[StatusT.accepted] },
  [StatusT.refused]: { backgroundColor: colors.status[StatusT.refused] },
  [StatusT.none]: { backgroundColor: colors.status[StatusT.none] },
  marginRight: { marginRight: 10 },
});

type Props = { status: StatusT; marginRight?: boolean };
function Status({ status, marginRight }: Props) {
  const myStyles: Record<string, any>[] = [styles.dot, styles[status]];
  if (marginRight) myStyles.push(styles.marginRight);

  return <View style={myStyles} />;
}
Status.defaultProps = { marginRight: false };
export default Status;
