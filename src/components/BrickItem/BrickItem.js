// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '../../hooks/navigation';
import { useBrickContext } from '../../hooks/bricks';
import { useConceptDeps } from '../../hooks/concepts';
import { ConceptT } from '../../constants/types';
import { getFeaturedBrick } from './helpers';
import BrickTitle from './BrickTitle';
import BrickContent from './BrickContent';

const styles = StyleSheet.create({
  empty: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
});

export type Props = {
  concept: string,
  onRemove: () => void,
  onSelect?: (concept: ConceptT) => void,
  onCreate?: (concept: ConceptT) => void,
  asConcept?: boolean,
};

function BrickItem(props: Props) {
  const { concept, asConcept } = props;
  const bricks = useBrickContext(concept);
  const navigation = useNavigation();
  const featured = getFeaturedBrick(bricks);
  const conceptDeps = useConceptDeps(concept);
  const isEmpty = bricks.length === 0;

  const getEmptyConceptItemProps = () => ({
    title: <BrickTitle concept={concept} asConcept={asConcept} />,
    subtitle: <BrickContent conceptDeps={conceptDeps} asConcept={asConcept} />,
    onPress: () => props.onCreate(concept, navigation),
    rightSubtitle: '',
    rightIcon: { name: 'plus', type: 'evilicon' },
  });

  const getWithFeaturedConceptItempProps = () => ({
    title: (
      <BrickTitle
        concept={concept}
        status={featured.status}
        asConcept={asConcept}
      />
    ),
    subtitle: (
      <BrickContent
        content={featured.content}
        conceptDeps={conceptDeps}
        asConcept={asConcept}
      />
    ),
    onPress: () => props.onSelect(concept, navigation),
    rightSubtitle: asConcept ? '' : bricks.length.toString(),
    rightIcon: { name: 'chevron-right', type: 'evilicon' },
  });

  const data = isEmpty
    ? getEmptyConceptItemProps()
    : getWithFeaturedConceptItempProps();

  if (props.onRemove != null)
    data.rightIcon = {
      name: 'delete',
      onPress: () => props.onRemove(concept),
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
  asConcept: false,
};

BrickItem.Empty = () => (
  <View style={styles.empty}>
    <Text>Cette brique n&apos;est liée à aucun concept.</Text>
  </View>
);
export default BrickItem;
