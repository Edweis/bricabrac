// @flow
import React from 'react';
import { ListItem } from 'react-native-elements';
import { useBricks } from '../../hooks';
import { ConceptT } from '../../constants/types';

export type Props = {
  concept: string,
  onSelect: (concept: ConceptT) => void,
  onCreate: (concept: ConceptT) => void
};
export default function ConceptItem({ concept, onSelect, onCreate }: Props) {
  const bricks = useBricks(concept);

  const data = bricks.length
    ? {
        rightSubtitle: bricks.length.toString(),
        subtitle: bricks[0].content,
        onPress: () => onSelect(concept),
        rightIcon: { name: 'chevron-right' }
      }
    : {
        rightSubtitle: '',
        subtitle: 'Pas encore de brique !',
        onPress: () => onCreate(concept),
        rightIcon: { name: 'add' }
      };

  return (
    <ListItem
      title={concept}
      rightSubtitle={data.rightSubtitle}
      subtitle={data.subtitle}
      onPress={data.onPress}
      rightIcon={data.rightIcon}
      bottomDivider
    />
  );
}
