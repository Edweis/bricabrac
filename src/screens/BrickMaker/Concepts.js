import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Switch, TextInput } from 'react-native';
import { Text, Badge, Icon, Button } from 'react-native-elements';

type Concept = {
  word: string,
};
type Props = {
  concepts: Concept[],
};
export default function Concepts(props: Props) {
  const [currentConcepts, setCurrentConcepts] = useState(props.concepts);
  const [newConceptValue, setNewConceptValue] = useState('');
  const addConcept = () => {
    if (!currentConcepts.includes(newConceptValue))
      setCurrentConcepts([...currentConcepts, newConceptValue]);
    setNewConceptValue('');
  };
  return (
    <View>
      <View style={styles.badges}>
        {currentConcepts.map((concept) => (
          <Badge key={concept} value={concept} containerStyle={styles.badge} />
        ))}
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  badges: { display: 'flex', flexDirection: 'row' },
  badge: { marginLeft: 10 },
  newBadge: { display: 'flex', flexDirection: 'row' },
  addButton: { marginLeft: 10 },
});
