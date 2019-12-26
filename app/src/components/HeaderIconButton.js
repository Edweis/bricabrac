import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({ container: { marginRight: 16 } });

type Props = { name: string, onPress: () => void, style: ?{} };
export default function HeaderIconButton(props: Props) {
  const { style, name, onPress, ...other } = props;
  return (
    <View style={[styles.container, style]}>
      {/* eslint-disable-next-line  react/jsx-props-no-spreading */}
      <Icon name={name} onPress={onPress} type="ionicon" {...other} />
    </View>
  );
}
