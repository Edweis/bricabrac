import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, ListItemProps } from 'react-native-elements';
import { useNavigation, NavigationProp } from '../../hooks/navigation';
import { useBricks } from '../../hooks/bricks';
import { useConceptDeps } from '../../hooks/concepts';
import { ConceptT } from '../../constants/types';
import { getFeaturedBrick } from './helpers';
import BrickTitle from './BrickTitle';
import BrickContent from './BrickContent';

const styles = StyleSheet.create({
  empty: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
});

export type Props = {
  concept: string;
  onRemove?: (concept: ConceptT) => void;
  onSelect: (concept: ConceptT, nav: NavigationProp) => void;
  onCreate: (concept: ConceptT, nav: NavigationProp) => void;
  asConcept: boolean;
};

function BrickItem(props: Props) {
  const { concept, asConcept } = props;
  const bricks = useBricks(concept);
  const navigation = useNavigation();
  const featured = getFeaturedBrick(bricks);
  const conceptDeps = useConceptDeps(concept);
  const isEmpty = bricks.length === 0;

  if (featured == null) return null;

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

  const data: Partial<ListItemProps> = isEmpty
    ? getEmptyConceptItemProps()
    : getWithFeaturedConceptItempProps();

  if (props.onRemove != null) {
    const onPress = () => props.onRemove != null && props.onRemove(concept);
    data.rightIcon = {
      name: 'delete',
      onPress,
    };
  }

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
  onSelect: (concept: ConceptT, navigation: NavigationProp) =>
    navigation.push('ConceptBrickList', { concept }),
  onCreate: (concept: ConceptT, navigation: NavigationProp) =>
    navigation.push('BrickMaker', { brick: { parentConcept: concept } }),
  asConcept: false,
};

BrickItem.Empty = () => (
  <View style={styles.empty}>
    <Text>Cette brique n&apos;est liée à aucun concept.</Text>
  </View>
);
export default BrickItem;
