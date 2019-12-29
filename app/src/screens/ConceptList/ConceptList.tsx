import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import SearchBarHeader from './SearchBarHeader';
import { useNavigation, NavigationProp } from '../../hooks/navigation';
import { useDisplayedConcepts, useNavigationEvent } from './hooks';
import BrickItem from '../../components/BrickItem';
import FAB from '../../components/FAB';

const styles = StyleSheet.create({
  content: {},
  fab: {
    position: 'absolute',
    margin: 34,
    right: 0,
    bottom: 50,
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#880',
  },
});

enum NavigationState {
  search = 'searchState',
  isOpen = 'isSearchOpenState',
}

function ConceptList() {
  const searchState = useState('');
  const isSearchOpenState = useState(false);
  const [, setIsSearchOpen] = isSearchOpenState;
  const [search, setSearch] = searchState;

  useNavigationEvent('willFocus', () => {
    setSearch('');
    setIsSearchOpen(false);
  });

  const concepts = useDisplayedConcepts(search);
  const navigation = useNavigation();

  const hideFAB = navigation.getParam('hideFAB', false);
  const onSelect = navigation.getParam('onSelect');
  const onCreate = navigation.getParam(
    'onCreate',
    BrickItem.defaultProps.onCreate,
  );

  // update title on search change
  useEffect(() => {
    navigation.setParams({ count: concepts.length });
  }, [concepts.length]);

  useEffect(() => {
    navigation.setParams({ [NavigationState.search]: searchState });
    navigation.setParams({ [NavigationState.isOpen]: isSearchOpenState });
  }, [search, isSearchOpenState[0]]);

  // Use FlatList if ScrollView becomes too slow
  return (
    <>
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <FlatList
          data={concepts}
          keyExtractor={parentConcept => parentConcept}
          renderItem={({ item }) => (
            <BrickItem
              key={item}
              concept={item}
              onSelect={onSelect}
              onCreate={onCreate}
            />
          )}
        />
      </ScrollView>
      {hideFAB === false && <FAB onPress={() => setIsSearchOpen(true)} />}
    </>
  );
}

const defaultParamState = [null, () => {}];

ConceptList.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationProp;
}) => {
  const rawTitle = navigation.getParam('title', 'Concepts');
  const brickCount = navigation.getParam('count', '...');
  const [search, setSearch] = navigation.getParam(
    NavigationState.search,
    defaultParamState,
  );
  const [isOpen, setIsOpen] = navigation.getParam(
    NavigationState.isOpen,
    defaultParamState,
  );
  const searchComponent = (
    <SearchBarHeader
      onChange={setSearch}
      value={search}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placeholder="Rechercher ou créer une brique"
    />
  );
  const title = isOpen ? null : `${rawTitle} (${brickCount})`;
  const headerTitle = isOpen ? searchComponent : null;
  const headerRight = isOpen ? null : searchComponent;

  return { title, headerRight, headerTitle };
};

export default ConceptList;
