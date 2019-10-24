import React, { useContext } from 'react';
import moment from 'moment';
import { NavigationContext } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Status from '../../components/Status';
import { useBricks } from '../../hooks';
import FAB from '../../components/FAB';

const styles = StyleSheet.create({
  main: {}
});

function ConceptBrickList() {
  const navigation = useContext(NavigationContext);
  const parentConcept = navigation.getParam('concept');
  const bricks = useBricks(parentConcept);

  return [
    bricks.length ? (
      bricks.map(brick => (
        <ListItem
          key={brick.id}
          title={brick.content}
          subtitle={brick.childrenConcepts.join(', ') || null}
          onPress={() =>
            navigation.navigate('BrickMaker', { brick, readOnly: true })
          }
          rightIcon={<Status status={brick.status} />}
          rightSubtitle={moment(brick.submitTime.toDate()).fromNow()}
          bottomDivider
          chevron
        />
      ))
    ) : (
      <ListItem title={`No bricks for ${parentConcept}`} key="none" />
    ),
    <FAB
      key="fab"
      onPress={() =>
        navigation.navigate('BrickMaker', { brick: { parentConcept } })
      }
    />
  ];
}

ConceptBrickList.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('concept')
});

export default ConceptBrickList;
