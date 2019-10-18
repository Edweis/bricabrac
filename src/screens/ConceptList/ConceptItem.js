// @flow
import React from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text } from 'react-native';
import { useBricks } from '../../hooks';
import { ConceptT } from '../../constants/types';
import { getFeaturedBrick } from './helpers';
import Status from '../../components/Status';

export type Props = {
  concept: string,
  onSelect: (concept: ConceptT) => void,
  onCreate: (concept: ConceptT) => void
};
export default function ConceptItem({ concept, onSelect, onCreate }: Props) {
  const bricks = useBricks(concept);
  const featured = getFeaturedBrick(bricks);
  const data = bricks.length
    ? {
        title: (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Status status={featured.status} marginRight />
            <Text>{concept}</Text>
          </View>
        ),
        rightSubtitle: bricks.length.toString(),
        subtitle: featured.content,
        onPress: () => onSelect(concept),
        rightIcon: { name: 'chevron-right' }
      }
    : {
        title: concept,
        rightSubtitle: '',
        subtitle: 'Pas encore de brique !',
        onPress: () => onCreate(concept),
        rightIcon: { name: 'add' }
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
