// @flow
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '../../hooks/navigation';
import { useDisplayedConcepts, useNavigationEvent } from './hooks';
import BrickItem from '../../components/BrickItem';
import LogoutButton from '../../components/LogoutButton';
import ProjectButton from '../../components/ProjectButton';
import GitHubButton from '../../components/GitHubButton';
import NewConceptFAB from './NewConceptFAB';

const styles = StyleSheet.create({
  content: {},
  fab: {
    position: 'absolute',
    margin: 34,
    right: 0,
    bottom: 50
  }
});

function ConceptList() {
  const [search, setSearch] = useState('');

  useNavigationEvent('willFocus', () => setSearch(''));

  const concepts = useDisplayedConcepts(search);
  const navigation = useNavigation();

  const hideFAB = navigation.getParam('hideFAB', false);
  const onSelect = navigation.getParam('onSelect');
  const onCreate = navigation.getParam(
    'onCreate',
    BrickItem.defaultProps.onCreate
  );

  // update title on search change
  useEffect(() => {
    navigation.setParams({ count: concepts.length });
  }, [concepts.length]);

  // Use FlatList if ScrollView becomes too slow
  return (
    <>
      <SearchBar
        placeholder="Search..."
        onChangeText={setSearch}
        value={search}
      />
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
  const title = `${rawTitle} (${brickCount})`;

  const headerRight =
    rawTitle === 'Concepts' ? (
      <>
        <ProjectButton />
        <GitHubButton />
        <LogoutButton />
      </>
    ) : (
      <LogoutButton />
    );
  return { title, headerRight };
};

export default ConceptList;
