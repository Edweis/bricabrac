import React from 'react';
import { ListItem } from 'react-native-elements';
import ConceptTitle from './ConceptTitle';
import ConceptContent from './ConceptContent';
import { useConceptDeps } from '../../hooks/concepts';

export type Props = {
  concept: string;
  asConcept: boolean;
  onPress: () => void;
};
function ConceptItemEmpty(props: Props) {
  const { concept, onPress, asConcept } = props;
  const conceptDeps = useConceptDeps(concept);
  return (
    <ListItem
      title={<ConceptTitle concept={concept} asConcept={asConcept} />}
      rightSubtitle=""
      subtitle={
        <ConceptContent conceptDeps={conceptDeps} asConcept={asConcept} />
      }
      onPress={onPress}
      rightIcon={{ name: 'plus', type: 'evilicon' }}
      bottomDivider
    />
  );
}

export default ConceptItemEmpty;
