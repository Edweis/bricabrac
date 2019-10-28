import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';
import type { ConceptT } from '../../constants/types';
import BrickItem from '../../components/BrickItem';

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
  const addConcept = (concept: ConceptT, nav: any) => {
    if (!concepts.includes(concept)) props.onChange([...concepts, concept]);
    nav.pop();
  };
  const removeConcept = (concept: ConceptT) => {
    props.onChange(concepts.filter(c => c !== concept));
  };

  return (
    <View>
      <View>
        {concepts.map(concept => (
          <BrickItem
            key={concept}
            concept={concept}
            onRemove={!readOnly ? () => removeConcept(concept) : null}
            asConcept
          />
        ))}
      </View>
      {!readOnly && (
        <Button
          onPress={() =>
            navigation.push('ConceptList', {
              title: 'Lier un concept',
              hideFAB: true,
              onSelect: addConcept,
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
