import React from 'react';
import moment from 'moment';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation, NavigationOptionsProps } from '../../hooks/navigation';
import Status from '../../components/Status';
import FAB from '../../components/FAB';
import ConceptItem from '../../components/ConceptItem';
import { useBricks } from '../../hooks';
import { useConceptDeps } from '../../hooks/concepts';
import EditConceptButton from './EditConceptButton';

function ConceptBrickList() {
  const navigation = useNavigation();
  const parentConcept = navigation.getParam('concept');
  const bricks = useBricks(parentConcept);
  const conceptDeps = useConceptDeps(parentConcept);

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        {conceptDeps.deps.map(concept => (
          <ConceptItem key={concept} concept={concept} asConcept />
        ))}
        {bricks.length ? (
          bricks.map(brick => (
            <ListItem
              key={brick.id}
              title={brick.content}
              subtitle={brick.childrenConcepts.join(', ') || undefined}
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

ConceptBrickList.navigationOptions = (props: NavigationOptionsProps) => {
  const concept = props.navigation.getParam('concept');
  const headerRight = <EditConceptButton concept={concept} />;
  return { title: concept, headerRight };
};

export default ConceptBrickList;
