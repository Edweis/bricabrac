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
import ConceptItem from './ConceptItem';

const styles = StyleSheet.create({
  content: {},
  fab: {
    position: 'absolute',
    margin: 34,
    right: 0,
    bottom: 50
  }
});
const defaultNavProps = {
  hideFAB: false,
  onSubmit: (concept, navigation) =>
    navigation.navigate('ConceptBrickList', { concept }),
  onCreate: (concept, navigation) =>
    navigation.navigate('BrickMaker', { concept })
};

function ConceptList() {
  const navigation = useContext(NavigationContext);
  const hideFAB = navigation.getParam('hideFAB', defaultNavProps.hideFAB);
  const onSubmit = navigation.getParam('onSubmit', defaultNavProps.onSubmit);
  const onCreate = navigation.getParam('onCreate', defaultNavProps.onCreate);

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
          <ConceptItem
            concept={parentConcept}
            onSelect={concept => {
              onSubmit(concept, navigation);
              navigation.goBack();
            }}
            onCreate={concept => {
              onCreate(concept, navigation);
              navigation.goBack();
            }}
            key={parentConcept}
          />
        ))}
      </ScrollView>
      {hideFAB === false && (
        <>
          <NewConceptModal
            show={showModal}
            onSubmit={concept => onCreate(concept, navigation)}
            onClose={() => setShowModal(false)}
          />
          <FAB onPress={() => setShowModal(true)} />
        </>
      )}
    </>
  );
}

ConceptList.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Concepts')
});

export default ConceptList;
