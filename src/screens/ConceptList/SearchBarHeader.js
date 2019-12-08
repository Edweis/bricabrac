// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar as RNESearchBar } from 'react-native-elements';
import { useSubscribedState } from '../../hooks/helpers';
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
  // We need to use a state wraped around the component because it takes too long to commit the search to navigation
  const [localSearch, setLocalSearch] = useSubscribedState(props.value);

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
        onChangeText={text => {
          setLocalSearch(text);
          props.onChange(text);
        }}
        value={localSearch}
        onClear={() => {
          props.onOpenChange(false);
        }}
        platform="android"
      />
    </View>
  );
}
