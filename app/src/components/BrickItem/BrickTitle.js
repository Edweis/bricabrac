import React from 'react';
import { View, Text } from 'react-native';
import { ConceptT, StatusT } from '../../constants/types';
import { formatConceptTitle } from './helpers';
import Status from '../Status';

function BrickTitle({
  status,
  concept,
  asConcept,
}: {
  status?: StatusT,
  concept: ConceptT,
  asConcept: boolean,
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {status && <Status status={status} marginRight />}
      <View>
        <Text>{formatConceptTitle(concept, asConcept)}</Text>
      </View>
    </View>
  );
}
BrickTitle.defaultProps = { status: null };

export default BrickTitle;
