// @flow
import React from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text } from 'react-native';
import { useBricks } from '../../hooks';
import { ConceptT, BrickT } from '../../constants/types';
import { getFeaturedBrick } from './helpers';
import Status from '../Status';

export type Props = {
  concept: string,
  onSelect: (concept: ConceptT) => void,
  onCreate: (concept: ConceptT) => void
};
const BrickTitle = ({ brick }: { brick: BrickT }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}
  >
    <Status status={brick.status} marginRight />
    <Text>{brick.parentConcept}</Text>
  </View>
);

export default function BrickItem(props: Props) {
  const { concept } = props;
  const bricks = useBricks(concept);
  const featured = getFeaturedBrick(bricks);
  const isEmpty = bricks.length === 0;

  const emptyConceptItemProps = () => ({
    title: concept,
    rightSubtitle: '',
    subtitle: 'Pas encore de brique !',
    onPress: () => props.onCreate(concept),
    rightIcon: { name: 'plus', type: 'evilicon' }
  });

  const withFeaturedConceptItempProps = () => ({
    title: <BrickTitle brick={featured} />,
    rightSubtitle: bricks.length.toString(),
    subtitle: featured.content,
    onPress: () => props.onSelect(concept),
    rightIcon: { name: 'chevron-right', type: 'evilicon' }
  });

  const data = isEmpty
    ? emptyConceptItemProps()
    : withFeaturedConceptItempProps();

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
