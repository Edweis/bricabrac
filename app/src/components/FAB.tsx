import React from 'react';
import { FAB } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';
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

const DefaultFab = (props: React.ComponentProps<typeof FAB>) => {
  return (
    <FAB
      style={[styles.fab, props.style] as ViewStyle}
      color={colors.orange}
      icon="plus"
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    />
  );
};

export default DefaultFab;
