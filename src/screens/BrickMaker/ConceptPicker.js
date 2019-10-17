import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';

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
export default function ConceptPicker(props: Props) {
  const navigation = useContext(NavigationContext);
  const { concepts } = props;
  const addConcept = (concept: Concept) => {
    if (!concepts.includes(concept)) props.onChange([...concepts, concept]);
  };
  const removeConcept = (concept: Concept) => {
    props.onChange(concepts.filter(c => c !== concept));
  };

  return (
    <View>
      <View style={styles.newBadge}>
        <Text>Linked concepts :</Text>
        <Button
          onPress={() =>
            navigation.push('ConceptList', {
              hideFAB: true,
              onSubmit: addConcept
            })
          }
          title="ajouter"
          type="outline"
          buttonStyle={styles.addButton}
        />
      </View>
      <View>
        {concepts.map(concept => (
          <ListItem
            key={concept}
            title={concept}
            rightIcon={{
              name: 'delete',
              onPress: () => removeConcept(concept)
            }}
            subtitle="Just the concept"
            bottomDivider
          />
        ))}
      </View>
    </View>
  );
}
