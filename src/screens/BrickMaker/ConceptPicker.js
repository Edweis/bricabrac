import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';

const styles = StyleSheet.create({
  badges: { display: 'flex', flexDirection: 'row' },
  badge: { marginLeft: 30 },
  newBadge: {},
  addConcept: { width: '50%', marginLeft: 'auto', marginRight: 'auto' }
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
      <Button
        onPress={() =>
          navigation.push('ConceptList', {
            title: 'Lier un concept',
            hideFAB: true,
            onSubmit: addConcept,
            onCreate: addConcept
          })
        }
        title="Lier un concept"
        type="outline"
        buttonStyle={styles.addConcept}
      />
    </View>
  );
}
