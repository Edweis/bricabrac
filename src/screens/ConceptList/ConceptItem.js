// @flow
import React from 'react';
import { ListItem } from 'react-native-elements';
import { useBricks } from '../../hooks';
import { ConceptT } from '../../constants/types';

export type Props = {
  concept: string,
  onSelect: (concept: ConceptT, navigation: any) => void
};
export default function ConceptItem({ concept, onSelect }: Props) {
  const bricks = useBricks(concept);

  if (!bricks.length)
    return <ListItem title={concept} subtitle="No bricks !" bottomDivider />;
  const featuredBrick = bricks[0];

  return (
    <ListItem
      title={concept}
      rightSubtitle={bricks.length.toString()}
      subtitle={featuredBrick.content}
      onPress={() => onSelect(concept)}
      bottomDivider
      chevron
    />
  );
}
