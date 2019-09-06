import React from 'react';
import _ from 'lodash';
import FAB from 'react-native-fab';
import { View, StyleSheet, Button, Switch, TextInput, ScrollView, Icon } from 'react-native';
import { Text } from 'react-native-elements';
import Concepts from '../../components/Concepts';
import { useBricks, addBrick } from '../../hooks';

function BrickList() {
  const bricks = useBricks();
  const ids = _.map(bricks, 'id');
  console.debug('Brick List', { ids, dif: _.difference(ids, _.uniq(ids)), lenght: bricks.length });

  // Use FlatList id ScrollView becomes too slow
  return (
    <>
      <ScrollView style={styles.main}>
        {bricks.map((brick) => (
          <View style={styles.brickContainer} key={brick.id}>
            <View style={styles.brickHeader}>
              <Text>Id : {brick.id}</Text>
              <Text style={styles.brickHeaderTitle}>Title : {brick.title}</Text>
              <Text style={styles.brickHeaderStatus}>Status : {brick.status}</Text>
            </View>
            <View style={styles.brickContent}>
              <Text style={styles.brickContentDefinition}>Definition : {brick.definition}</Text>
              <Text style={styles.brickContentConcepts}>Concepts : {brick.concepts}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <FAB
        onClickAction={() => {
          console.log('FAB pressed');
        }}
        visible={true}
      />
    </>
  );
}

// <Concepts concepts={brick.concepts && brick.concepts.split('|')} />
const styles = StyleSheet.create({
  main: { borderWidth: 1, borderColor: 'grey', borderStyle: 'solid', margin: 8 },
  brickContainer: { borderWidth: 1, borderColor: 'black', borderStyle: 'solid', marginBottom: 10 },
  brickHeader: {},
  brickHeaderTitle: {},
  sectionTitle: {},
  brickHeaderStatus: {},
  brickContent: {},
  brickContentDefinition: {},
  brickContentConcepts: {},
});

export default BrickList;
