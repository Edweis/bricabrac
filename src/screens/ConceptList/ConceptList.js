// @flow
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import SearchBarHeader from './SearchBarHeader';
import { useNavigation } from '../../hooks/navigation';
import { useDisplayedConcepts, useNavigationEvent } from './hooks';
import BrickItem from '../../components/BrickItem';
import NewConceptFAB from './NewConceptFAB';

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

const SEARCH_STATE_PROP = 'searchState';
const IS_SEARCH_OPEN_PROPS = 'isSearchOpenState';

function ConceptList() {
  const searchState = useState('');
  const isSearchOpenState = useState(false);
  const [search, setSearch] = searchState;

  useNavigationEvent('willFocus', () => setSearch(''));

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
    navigation.setParams({ [SEARCH_STATE_PROP]: searchState });
    navigation.setParams({ [IS_SEARCH_OPEN_PROPS]: isSearchOpenState });
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
      {hideFAB === false && <NewConceptFAB />}
    </>
  );
}

ConceptList.navigationOptions = ({ navigation }) => {
  const rawTitle = navigation.getParam('title', 'Concepts');
  const brickCount = navigation.getParam('count', '...');
  const [search, setSearch] = navigation.getParam(SEARCH_STATE_PROP, [
    null,
    () => {},
  ]);
  const [isOpen, setIsOpen] = navigation.getParam(IS_SEARCH_OPEN_PROPS, [
    null,
    () => {},
  ]);
  const searchComponent = (
    <SearchBarHeader
      onChange={setSearch}
      value={search}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  );
  const title = isOpen ? null : `${rawTitle} (${brickCount})`;
  const headerTitle = isOpen ? searchComponent : null;
  const headerRight = isOpen ? null : searchComponent;

  return { title, headerRight, headerTitle };
};

export default ConceptList;
