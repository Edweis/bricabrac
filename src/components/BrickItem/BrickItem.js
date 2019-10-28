// @flow
import React, { useContext } from 'react';
import { ListItem } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';
import { useBricks } from '../../hooks';
import { ConceptT } from '../../constants/types';
import { getFeaturedBrick, formatConceptTitle } from './helpers';
import BrickTitle from './BrickTitle';

export type Props = {
  concept: string,
  onRemove: () => void,
  onSelect?: (concept: ConceptT) => void,
  onCreate?: (concept: ConceptT) => void,
  asConcept?: boolean
};
function BrickItem(props: Props) {
  const { concept, asConcept } = props;
  const bricks = useBricks(concept);
  const navigation = useContext(NavigationContext);
  const featured = getFeaturedBrick(bricks);
  const isEmpty = bricks.length === 0;

  const emptyConceptItemProps = () => ({
    title: asConcept ? formatConceptTitle(concept) : concept,
    rightSubtitle: '',
    subtitle: asConcept ? '' : 'Pas encore de brique !',
    onPress: () => props.onCreate(concept, navigation),
    rightIcon: { name: 'plus', type: 'evilicon' }
  });

  const withFeaturedConceptItempProps = () => ({
    title: <BrickTitle brick={featured} asConcept={asConcept} />,
    rightSubtitle: asConcept ? '' : bricks.length.toString(),
    subtitle: featured.content,
    onPress: () => props.onSelect(concept, navigation),
    rightIcon: { name: 'chevron-right', type: 'evilicon' }
  });

  const data = isEmpty
    ? emptyConceptItemProps()
    : withFeaturedConceptItempProps();

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
    console.debug('DEFAULT onSelect') ||
    navigation.push('ConceptBrickList', { concept }),
  onCreate: (concept, navigation) =>
    console.debug('DEFAULT onCreate') ||
    navigation.navigate('BrickMaker', { brick: { parentConcept: concept } }),
  asConcept: false
};
export default BrickItem;
