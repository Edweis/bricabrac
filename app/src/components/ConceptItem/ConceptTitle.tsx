import React from 'react';
import { View, Text } from 'react-native';
import { ConceptT } from '../../constants/types';
import { formatConceptTitle } from './helpers';

type Props = {
  concept: ConceptT;
  asConcept: boolean;
};
function ConceptTitle({ concept, asConcept }: Props) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View>
        <Text>{formatConceptTitle(concept, asConcept)}</Text>
      </View>
    </View>
  );
}
ConceptTitle.defaultProps = { status: null };

export default ConceptTitle;
