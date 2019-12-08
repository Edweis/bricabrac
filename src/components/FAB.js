// @flow
import React from 'react';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 34,
    right: 0,
    bottom: 0,
    alignSelf: 'flex-end',
    backgroundColor: colors.orange,
  },
});

export default (props: any) => {
  return (
    <FAB
      style={[styles.fab, props.styles]}
      color={colors.white}
      icon="plus"
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    />
  );
};
