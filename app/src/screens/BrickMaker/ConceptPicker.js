import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '../../hooks/navigation';
import { ConceptT } from '../../constants/types';
import ConceptItem from '../../components/ConceptItem';

const styles = StyleSheet.create({
  badges: { display: 'flex', flexDirection: 'row' },
  badge: { marginLeft: 30 },
  newBadge: {},
  addConcept: { width: '50%', marginLeft: 'auto', marginRight: 'auto' },
});

type Props = {
  concepts: ConceptT[],
  onChange: (concepts: ConceptT[]) => void,
  readOnly?: boolean,
};
function ConceptPicker(props: Props) {
  const navigation = useNavigation();
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
        {concepts.length > 0 ? (
          concepts.map(concept => (
            <ConceptItem
              key={concept}
              concept={concept}
              onRemove={!readOnly ? removeConcept : null}
              asConcept
            />
          ))
        ) : (
          <ConceptItem.Empty />
        )}
      </View>
      {!readOnly && (
        <Button
          onPress={() =>
            navigation.push('ConceptList', {
              title: 'Lier un concept',
              hideFAB: true,
              onSelect: addConcept,
              onCreate: addConcept,
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
