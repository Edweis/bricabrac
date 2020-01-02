import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '../../hooks/navigation';
import { useBricks } from '../../hooks/bricks';
import { ConceptT } from '../../constants/types';
import ConceptItemEmpty from './ConceptItemEmpty';
import ConceptItemFeatured from './ConceptItemFeatured';

export type Props = {
  concept: string;
  onRemove?: (concept: ConceptT) => void;
  onSelect: (concept: ConceptT, nav: NavigationProp) => void;
  onCreate: (concept: ConceptT, nav: NavigationProp) => void;
  asConcept: boolean;
};

function ConceptItem(props: Props) {
  const { concept, asConcept } = props;
  const bricks = useBricks(concept);
  const navigation = useNavigation();
  const isEmpty = bricks.length === 0;

  return isEmpty ? (
    <ConceptItemEmpty
      concept={concept}
      asConcept={asConcept}
      onPress={() => props.onCreate(concept, navigation)}
    />
  ) : (
    <ConceptItemFeatured
      concept={concept}
      asConcept={asConcept}
      onPress={() => props.onSelect(concept, navigation)}
      onRemove={() => (props.onRemove != null ? props.onRemove(concept) : null)}
    />
  );
}

ConceptItem.defaultProps = {
  onSelect: (concept: ConceptT, navigation: NavigationProp) =>
    navigation.push('ConceptBrickList', { concept }),
  onCreate: (concept: ConceptT, navigation: NavigationProp) =>
    navigation.push('BrickMaker', { brick: { parentConcept: concept } }),
  asConcept: false,
};

const styles = StyleSheet.create({
  empty: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
});
ConceptItem.Empty = () => (
  <View style={styles.empty}>
    <Text>Cette brique n&apos;est liée à aucun concept.</Text>
  </View>
);
export default ConceptItem;
