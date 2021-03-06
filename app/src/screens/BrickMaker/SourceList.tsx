import React, { useState, useMemo } from 'react';
import _ from 'lodash';
import { ScrollView } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { useNavigation, NavigationOptionsProps } from '../../hooks/navigation';
import { useBricks, useFocusOnMount } from '../../hooks';
import { EMPTY_SOURCE } from '../../constants/defaults';

const useDisplayedSources = (search: string) => {
  const bricks = useBricks();

  const orderedSourceBlocks = useMemo(
    () =>
      _(bricks)
        .filter(brick => !!brick.source) // remove empty sources
        .map(brick => ({
          submitTime: brick.submitTime.toMillis(),
          source: brick.source,
        }))
        .sortBy(['submitTime'])
        .reverse()
        .groupBy('source')
        .mapValues((v, k) => ({ source: k, count: v.length }))
        .values()
        .value(),
    [bricks],
  );

  return useMemo(() => {
    const blocks = [...orderedSourceBlocks];
    blocks.unshift({ source: '', count: 0 });
    if (search.trim() !== '')
      blocks.unshift({ source: search.trim(), count: 0 });
    return blocks;
  }, [orderedSourceBlocks, search]);
};

function SourceList() {
  const navigation = useNavigation();
  const onSelect = navigation.getParam('onSelect');

  const focusOnMountRef = useFocusOnMount<SearchBar>();
  const [search, setSearch] = useState('');
  const sourceData = useDisplayedSources(search);

  // Use FlatList if ScrollView becomes too slow
  return (
    <>
      <SearchBar
        placeholder="Rechercher ou ajouter ..."
        onChangeText={setSearch}
        value={search}
        ref={focusOnMountRef}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        {sourceData.map(sourceDatum => (
          <ListItem
            key={sourceDatum.source}
            title={sourceDatum.source ? sourceDatum.source : EMPTY_SOURCE}
            rightSubtitle={sourceDatum.count.toString()}
            rightIcon={{ name: 'chevron-right' }}
            onPress={() => onSelect(sourceDatum.source)}
            bottomDivider
          />
        ))}
      </ScrollView>
    </>
  );
}

SourceList.navigationOptions = (props: NavigationOptionsProps) => ({
  title: props.navigation.getParam('title', 'Sources'),
});

export default SourceList;
