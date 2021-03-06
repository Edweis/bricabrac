import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar as RNESearchBar } from 'react-native-elements';
import { useSubscribedState, useFocusOnMount } from '../../hooks/helpers';
import HeaderIconButton from '../../components/HeaderIconButton';
import ProjectButton from '../../components/ProjectButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    width: '100%',
  },
});
type Props = {
  onChange: (value: string) => void;
  value: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  placeholder: string;
};
const SearchBarHeader = (props: Props) => {
  // We need to use a state wraped around the component because it takes too long to commit the search to navigation
  const [localSearch, setLocalSearch] = useSubscribedState(props.value);
  const [localIsOpen, setLocalIsOpen] = useSubscribedState(props.isOpen);
  const setOpen = (isOpen: boolean) => {
    setLocalIsOpen(isOpen);
    props.onOpenChange(isOpen);
    setLocalSearch('');
    props.onChange('');
  };
  const ref = useFocusOnMount<RNESearchBar>();

  if (!localIsOpen) {
    return (
      <>
        <HeaderIconButton name="ios-search" onPress={() => setOpen(true)} />
        <ProjectButton />
      </>
    );
  }
  return (
    <View style={styles.container}>
      <RNESearchBar
        placeholder={props.placeholder}
        value={localSearch}
        onChangeText={text => {
          setLocalSearch(text);
          props.onChange(text);
        }}
        onClear={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        platform="android"
        ref={ref}
      />
    </View>
  );
};

export default SearchBarHeader;
