import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { StatusT } from '../constants/types';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  accepted: { backgroundColor: colors.status.accepted },
  refused: { backgroundColor: colors.status.refused },
  none: { backgroundColor: colors.status.none }
});

export default function Status({ status }: { status: StatusT }) {
  return <View style={[styles.dot, styles[status]]} />;
}
