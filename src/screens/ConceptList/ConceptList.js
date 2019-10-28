// @flow
import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { StyleSheet, ScrollView } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import FAB from '../../components/FAB';
import { useBricks } from '../../hooks';
import { matchBrickWithSearch } from './helpers';
import NewConceptModal from './NewConceptModal';
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

function ConceptList() {
  const navigation = useContext(NavigationContext);
  const hideFAB = navigation.getParam('hideFAB', false);
  const onSelect = navigation.getParam('onSelect');
  const onCreate = navigation.getParam('onCreate');

  const bricks = useBricks();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const concepts = _(bricks)
    .filter(brick => matchBrickWithSearch(brick, search))
    .map('parentConcept')
    .uniq()
    .sortBy()
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
            onSelect={onSelect}
            onCreate={onCreate}
          />
        ))}
      </ScrollView>
      {hideFAB === false && (
        <>
          <NewConceptModal
            show={showModal}
            onSubmit={onCreate}
            onClose={() => setShowModal(false)}
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
