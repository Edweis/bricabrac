// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar as RNESearchBar } from 'react-native-elements';
import HeaderIconButton from '../../components/HeaderIconButton';
import ProjectButton from '../../components/ProjectButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    width: '100%',
  },
});
type Props = {
  onChange: string => void,
  value: string,
  isOpen: boolean,
  onOpenChange: boolean => void,
};
export default function SearchBarHeader(props: Props) {
  if (!props.isOpen) {
    return (
      <>
        <HeaderIconButton
          name="ios-search"
          onPress={() => props.onOpenChange(true)}
        />
        <ProjectButton />
      </>
    );
  }
  return (
    <View style={styles.container}>
      <RNESearchBar
        placeholder="Search..."
        onChangeText={props.onChange}
        value={props.value}
        onClear={() => {
          props.onOpenChange(false);
        }}
        platform="android"
      />
    </View>
  );
}
