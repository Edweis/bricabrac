import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';
import type { ConceptT } from '../../constants/types';

const styles = StyleSheet.create({
  badges: { display: 'flex', flexDirection: 'row' },
  badge: { marginLeft: 30 },
  newBadge: {},
  addConcept: { width: '50%', marginLeft: 'auto', marginRight: 'auto' }
});

type Props = {
  concepts: ConceptT[],
  onChange: (ConceptT[]) => void,
  readOnly?: boolean
};
function ConceptPicker(props: Props) {
  const navigation = useContext(NavigationContext);
  const { concepts, readOnly } = props;
  const addConcept = (concept: ConceptT) => {
    if (!concepts.includes(concept)) props.onChange([...concepts, concept]);
  };
  const removeConcept = (concept: ConceptT) => {
    props.onChange(concepts.filter(c => c !== concept));
  };
  const listItemProps = concept => {
    if (readOnly)
      return {
        onPress: navigation.navigate('BrickMaker', {
          brick: { parentConcept: concept }
        })
      };
    return {
      rightIcon: {
        name: 'delete',
        onPress: () => removeConcept(concept)
      }
    };
  };

  return (
    <View>
      <View>
        {concepts.map(concept => (
          <ListItem
            key={concept}
            title={concept}
            subtitle="Just the concept"
            {...listItemProps}
          />
        ))}
      </View>
      {!readOnly && (
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
      )}
    </View>
  );
}

ConceptPicker.defaultProps = { readOnly: false };

export default ConceptPicker;
