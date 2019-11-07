// @flow
import React, { useState, useContext, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { StyleSheet, ScrollView, View } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import FAB from '../../components/FAB';
import { useDisplayedConcepts, useNavigationEvent } from './hooks';
import ActionModal from '../../components/ActionModal';
import BrickItem from '../../components/BrickItem';
import LogoutButton from '../../components/LogoutButton';
import ProjectButton from '../../components/ProjectButton';

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
  const [showModal, setShowModal] = useState(false);
  useNavigationEvent('willFocus', () => setSearch(''));

  const concepts = useDisplayedConcepts(search);
  const navigation = useContext(NavigationContext);

  const hideFAB = navigation.getParam('hideFAB', false);
  const onSelect = navigation.getParam('onSelect');
  const onCreate = navigation.getParam(
    'onCreate',
    BrickItem.defaultProps.onCreate
  );

  const throttledSearch = useCallback(_.throttle(setSearch, 100), []);
  // update title on search change
  useEffect(() => {
    navigation.setParams({ count: concepts.length });
  }, [concepts.length]);

  // Use FlatList if ScrollView becomes too slow
  return (
    <>
      <SearchBar
        placeholder="Search..."
        onChangeText={throttledSearch}
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
          <ActionModal
            show={showModal}
            onSubmit={onCreate}
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

ConceptList.navigationOptions = ({ navigation }) => {
  const rawTitle = navigation.getParam('title', 'Concepts');
  const brickCount = navigation.getParam('count', '...');
  const title = `${rawTitle} (${brickCount})`;

  const headerRight =
    rawTitle === 'Concepts' ? (
      <>
        <ProjectButton />
        <LogoutButton />
      </>
    ) : (
      <LogoutButton />
    );
  return { title, headerRight };
};

export default ConceptList;
