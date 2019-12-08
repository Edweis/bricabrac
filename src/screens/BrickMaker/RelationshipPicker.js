import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { RelationshipT } from '../../constants/types';
import { translateRelationship } from '../../constants/translations';

type Props = {
  relationship: RelationshipT,
  setReltionship: RelationshipT => void,
  readOnly?: boolean,
};

const styles = StyleSheet.create({ main: { marginBottom: 10, marginTop: 10 } });

const relationships = [
  'deduction',
  'implication',
  'partition',
  'definition',
  'undefined',
];

function RelationshipPicker(props: Props) {
  const { relationship, setReltionship, readOnly } = props;
  if (readOnly)
    return (
      <View style={styles.main}>
        <Text>Relation : {translateRelationship[relationship]}</Text>
      </View>
    );
  return (
    <Picker
      selectedValue={relationship}
      onValueChange={setReltionship}
      style={styles.main}
    >
      {relationships.map(rel => (
        <Picker.Item key={rel} label={translateRelationship[rel]} value={rel} />
      ))}
    </Picker>
  );
}
RelationshipPicker.defaultProps = { readOnly: false };
export default RelationshipPicker;
