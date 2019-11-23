import React from 'react';
import moment from 'moment';
import { StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '../../hooks/navigation';
import Status from '../../components/Status';
import FAB from '../../components/FAB';
import BrickItem from '../../components/BrickItem';
import { useBrickContext } from '../../hooks';
import { useConceptDeps } from '../../hooks/concepts';
import EditConceptButton from './EditConceptButton';

const styles = StyleSheet.create({
  main: {}
});

function ConceptBrickList() {
  const navigation = useNavigation();
  const parentConcept = navigation.getParam('concept');
  const bricks = useBrickContext(parentConcept);
  const conceptDeps = useConceptDeps(parentConcept);

  return (
    <>
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {conceptDeps.deps.map(concept => (
          <BrickItem key={concept} concept={concept} asConcept />
        ))}
        {bricks.length ? (
          bricks.map(brick => (
            <ListItem
              key={brick.id}
              title={brick.content}
              subtitle={brick.childrenConcepts.join(', ') || null}
              onPress={() =>
                navigation.push('BrickMaker', { brick, readOnly: true })
              }
              rightIcon={<Status status={brick.status} />}
              rightSubtitle={moment(brick.submitTime.toDate()).fromNow()}
              bottomDivider
              chevron
            />
          ))
        ) : (
          <ListItem title={`No bricks for ${parentConcept}`} key="none" />
        )}
      </ScrollView>
      <FAB
        key="fab"
        onPress={() =>
          navigation.push('BrickMaker', { brick: { parentConcept } })
        }
      />
    </>
  );
}

ConceptBrickList.navigationOptions = ({ navigation }) => {
  const concept = navigation.getParam('concept');
  const headerRight = <EditConceptButton concept={concept} />;
  return { title: concept, headerRight };
};

export default ConceptBrickList;
