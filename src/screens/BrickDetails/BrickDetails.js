import React, { useContext } from 'react';
import moment from 'moment';
import { NavigationContext } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { DEFAULT_BRICK } from '../../constants/defaults';
import FAB from '../../components/FAB';

const styles = StyleSheet.create({
  content: {
    margin: 20
  }
});

function BrickDetails() {
  const navigation = useContext(NavigationContext);
  const brick = navigation.getParam('brick', DEFAULT_BRICK);

  return (
    <>
      <View style={styles.main}>
        <View style={styles.content}>
          <Text>Content</Text>
          <Text>{brick.content}</Text>
        </View>
        <View style={styles.status}>
          <Text>Status</Text>
          <Text>{brick.status}</Text>
        </View>
        <View style={styles.source}>
          <Text>Source</Text>
          <Text>{brick.source}</Text>
        </View>
        <View style={styles.submitTime}>
          <Text>Time</Text>
          <Text>{moment(brick.submitTime.toDate()).format()}</Text>
        </View>
        <View style={styles.childrenConcepts}>
          <Text>Concepts</Text>
          <Text>{brick.childrenConcepts.join(', ')}</Text>
        </View>
      </View>
      <FAB
        key="fab"
        onPress={() =>
          navigation.navigate('BrickMaker', { concept: brick.parentConcept })
        }
      />
    </>
  );
}

BrickDetails.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('brick', { parentConcept: '...' }).parentConcept
});

export default BrickDetails;
