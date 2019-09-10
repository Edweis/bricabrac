import React, { useState, useCallback } from "react";
import { View, StyleSheet, Switch, TextInput } from "react-native";
import { Text, Badge, Icon, Button } from "react-native-elements";

const styles = StyleSheet.create({
  badges: { display: "flex", flexDirection: "row" },
  badge: { marginLeft: 30 },
  newBadge: { display: "flex", flexDirection: "row" },
  addButton: { marginLeft: 10 }
});

type Concept = {
  word: string
};
type Props = {
  concepts: Concept[],
  hideInput: boolean
};
export default function Concepts(props: Props) {
  const [currentConcepts, setCurrentConcepts] = useState(props.concepts);
  const [newConceptValue, setNewConceptValue] = useState("");
  const addConcept = () => {
    if (!currentConcepts.includes(newConceptValue))
      setCurrentConcepts([...currentConcepts, newConceptValue]);
    setNewConceptValue("");
  };
  return (
    <View>
      {!props.hideInput && (
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
      )}
      <View style={styles.badges}>
        {currentConcepts.map(concept => (
          <Badge key={concept} value={concept} containerStyle={styles.badge} />
        ))}
      </View>
    </View>
  );
}

Concepts.defaultProps = { hideInput: false };
