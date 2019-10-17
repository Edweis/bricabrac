import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Badge, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  badges: { display: 'flex', flexDirection: 'row' },
  badge: { marginLeft: 30 },
  newBadge: { display: 'flex', flexDirection: 'row' },
  addButton: { marginLeft: 10 }
});

type Concept = {
  word: string
};
type Props = {
  concepts: Concept[],
  onChange: (Concept[]) => void
};
export default function ConceptsPicker(props: Props) {
  const { concepts } = props;
  const [newConceptValue, setNewConceptValue] = useState('');
  const addConcept = () => {
    if (!concepts.includes(newConceptValue)) {
      props.onChange([...concepts, newConceptValue]);
    }
    setNewConceptValue('');
  };
  return (
    <View>
      <View style={styles.newBadge}>
        <TextInput
          placeholder="Nouveau concept"
          onChangeText={setNewConceptValue}
          value={newConceptValue}
        />
        <Button
          onPress={addConcept}
          title="ajouter"
          type="outline"
          buttonStyle={styles.addButton}
        />
      </View>
      <View style={styles.badges}>
        {concepts.map(concept => (
          <Badge key={concept} value={concept} containerStyle={styles.badge} />
        ))}
      </View>
    </View>
  );
}
