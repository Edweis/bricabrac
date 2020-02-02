import React from 'react';
import { ListItem } from 'react-native-elements';
import { useBricks } from '../../hooks/bricks';
import { useConceptDeps } from '../../hooks/concepts';
import { getFeaturedBrick } from './helpers';
import ConceptTitle from './ConceptTitle';
import ConceptContent from './ConceptContent';

export type Props = {
  concept: string;
  onPress: () => void;
  asConcept: boolean;
  onRemove?: () => void;
};

function ConceptItemFeatured(props: Props) {
  const { concept, onPress, asConcept, onRemove } = props;
  const conceptDeps = useConceptDeps(concept);
  const bricks = useBricks(concept);
  const featured = getFeaturedBrick(bricks);
  if (featured == null) {
    throw Error(
      'A featured concept was created without any brick in its concept.',
    );
  }

  const isRemovable = onRemove != null && asConcept;
  const rightIcon = isRemovable
    ? { name: 'delete', onPress: onRemove }
    : { name: 'chevron-right', type: 'evilicon' };
  return (
    <ListItem
      title={<ConceptTitle concept={concept} asConcept={asConcept} />}
      rightSubtitle={asConcept ? '' : bricks.length.toString()}
      subtitle={
        <ConceptContent
          content={featured.content}
          conceptDeps={conceptDeps}
          asConcept={asConcept}
        />
      }
      onPress={onPress}
      rightIcon={rightIcon}
      bottomDivider
    />
  );
}

export default ConceptItemFeatured;
