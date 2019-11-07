// @flow
import React, { useState, useContext, useCallback } from 'react';
import _ from 'lodash';
import { StyleSheet, ScrollView } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import type { ConceptT } from '../../constants/types';
import FAB from '../../components/FAB';
import { useBrickContext } from '../../hooks';
import { matchSearch, normalize } from '../../helpers';
import ActionModal from '../../components/ActionModal';
import BrickItem from '../../components/BrickItem';
import LogoutButton from '../../components/LogoutButton';

const styles = StyleSheet.create({
  content: {},
  fab: {
    position: 'absolute',
    margin: 34,
    right: 0,
    bottom: 50
  }
});

const defaultCreation = (concept, navigation) =>
  navigation.push('BrickMaker', { brick: { parentConcept: concept } });

function ConceptList() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useContext(NavigationContext);
  const hideFAB = navigation.getParam('hideFAB', false);
  const onSelect = navigation.getParam('onSelect');
  const onCreate = navigation.getParam('onCreate', defaultCreation);
  const resetSearchThen = useCallback((cb: Function) => (...args) => {
    setSearch('');
    cb(...args);
  });

  const bricks = useBrickContext();

  const parentConcepts = _(bricks).map('parentConcept');
  const orphanConcepts = _(bricks)
    .map('childrenConcepts')
    .flatten()
    .value();
  const concepts = parentConcepts
    .union(orphanConcepts)
    .filter(concept => matchSearch(concept, search))
    .uniq()
    .sortBy(normalize)
    .value();

  if (search.trim() !== '') concepts.unshift(search.trim());

  // Use FlatList if ScrollView becomes too slow
  return (
    <>
      <SearchBar
        placeholder="Search..."
        onChangeText={setSearch}
        value={search}
      />
      <ScrollView style={styles.content}>
        {concepts.map(parentConcept => (
          <BrickItem
            key={parentConcept}
            concept={parentConcept}
            onSelect={resetSearchThen(onSelect)}
            onCreate={resetSearchThen(onCreate)}
          />
        ))}
      </ScrollView>
      {hideFAB === false && (
        <>
          <ActionModal
            show={showModal}
            onSubmit={resetSearchThen(onCreate)}
            onClose={() => setShowModal(false)}
            title="Nouveau concept"
            submitText="Créér"
          />
          <FAB onPress={() => setShowModal(true)} />
        </>
      )}
    </>
  );
}

ConceptList.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Concepts'),
  headerRight: <LogoutButton />
});

export default ConceptList;
