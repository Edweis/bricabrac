// @flow
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';
import { useBrickContext } from '../../hooks';
import { ConceptT } from '../../constants/types';
import { getFeaturedBrick, formatConceptTitle, formatContent } from './helpers';
import BrickTitle from './BrickTitle';

const styles = StyleSheet.create({
  empty: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
});

export type Props = {
  concept: string,
  onRemove: () => void,
  onSelect?: (concept: ConceptT) => void,
  onCreate?: (concept: ConceptT) => void,
  asConcept?: boolean
};

function BrickItem(props: Props) {
  const { concept, asConcept } = props;
  const bricks = useBrickContext(concept);
  const navigation = useContext(NavigationContext);
  const featured = getFeaturedBrick(bricks);
  const isEmpty = bricks.length === 0;

  const getEmptyConceptItemProps = () => ({
    title: asConcept ? formatConceptTitle(concept) : concept,
    subtitle: asConcept ? null : 'Pas encore de brique !',
    onPress: () => props.onCreate(concept, navigation),
    rightSubtitle: '',
    rightIcon: { name: 'plus', type: 'evilicon' }
  });

  const getWithFeaturedConceptItempProps = () => ({
    title: <BrickTitle brick={featured} asConcept={asConcept} />,
    subtitle: asConcept ? null : formatContent(featured.content),
    onPress: () => props.onSelect(concept, navigation),
    rightSubtitle: asConcept ? '' : bricks.length.toString(),
    rightIcon: { name: 'chevron-right', type: 'evilicon' }
  });

  const data = isEmpty
    ? getEmptyConceptItemProps()
    : getWithFeaturedConceptItempProps();

  if (props.onRemove != null)
    data.rightIcon = {
      name: 'delete',
      onPress: () => props.onRemove()
    };

  return (
    <ListItem
      title={data.title}
      rightSubtitle={data.rightSubtitle}
      subtitle={data.subtitle}
      onPress={data.onPress}
      rightIcon={data.rightIcon}
      bottomDivider
    />
  );
}

BrickItem.defaultProps = {
  onSelect: (concept, navigation) =>
    navigation.push('ConceptBrickList', { concept }),
  onCreate: (concept, navigation) =>
    navigation.push('BrickMaker', { brick: { parentConcept: concept } }),
  asConcept: false
};

BrickItem.Empty = () => (
  <View style={styles.empty}>
    <Text>Cette brique n&apos;est liée à aucun concept.</Text>
  </View>
);
export default BrickItem;