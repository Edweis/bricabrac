// @flow
import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { StyleSheet, ScrollView } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { SearchBar, ListItem } from 'react-native-elements';
import { useBricks, useFocusOnMount } from '../../hooks';
import { matchSearch } from '../../helpers';
import { EMPTY_SOURCE } from '../../constants/defaults';

const styles = StyleSheet.create({
  content: {},
  fab: {
    position: 'absolute',
    margin: 34,
    right: 0,
    bottom: 50
  }
});

function SourceList() {
  const navigation = useContext(NavigationContext);
  const onSelect = navigation.getParam('onSelect');

  const sources = useBricks().map(b => b.source);
  const focusOnMountRef = useFocusOnMount();
  const [search, setSearch] = useState('');

  const sourceData = _(sources)
    .filter(source => matchSearch(source, search))
    // Remove sourceless brick
    .filter(source => !!source)
    .groupBy()
    .mapValues((v, k) => ({ count: v.length, name: k }))
    .values()
    .sortBy('count')
    .value();

  sourceData.unshift({ name: '', count: 0 });
  if (search.trim() !== '')
    sourceData.unshift({ name: search.trim(), count: 0 });

  // Use FlatList if ScrollView becomes too slow
  return (
    <>
      <SearchBar
        placeholder="Rechercher ou ajouter ..."
        onChangeText={setSearch}
        value={search}
        ref={focusOnMountRef}
      />
      <ScrollView style={styles.content}>
        {sourceData.map(sourceDatum => (
          <ListItem
            key={sourceDatum.name}
            title={sourceDatum.name ? sourceDatum.name : EMPTY_SOURCE}
            rightSubtitle={sourceDatum.count.toString()}
            rightIcon={{ name: 'chevron-right' }}
            onPress={() => onSelect(sourceDatum.name)}
            bottomDivider
          />
        ))}
      </ScrollView>
    </>
  );
}

SourceList.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Sources')
});

export default SourceList;
