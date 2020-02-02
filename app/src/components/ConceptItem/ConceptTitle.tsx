import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConceptT } from '../../constants/types';
import { formatConceptTitle } from './helpers';

type Props = {
  concept: ConceptT;
  asConcept: boolean;
};
const styles = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
});

function ConceptTitle({ concept, asConcept }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text>{formatConceptTitle(concept, asConcept)}</Text>
      </View>
    </View>
  );
}
ConceptTitle.defaultProps = { status: null };

export default ConceptTitle;
