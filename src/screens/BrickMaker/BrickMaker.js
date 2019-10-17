import React, { useState, useContext } from 'react';
import { NavigationContext } from 'react-navigation';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { Text, Input } from 'react-native-elements';
import ConceptPicker from './ConceptPicker';
import StatusPicker from './StatusPicker';
import { addBrick, useFocusOnMount } from '../../hooks';
import { getBrickError } from './helpers';
import { EMPTY_BRICK } from '../../constants/defaults';

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    padding: 10,
    height: '100%',
    justifyContent: 'space-between'
  },
  definition: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  status: {},
  statusTitle: {},
  inputContainer: { height: 50, fontSize: 40 },
  containerStyle: { height: 50, fontSize: 50 }
});

function BrickMaker() {
  const navigation = useContext(NavigationContext);
  const [newBrick, setNewBrick] = useState({
    ...EMPTY_BRICK,
    parentConcept: navigation.getParam('concept')
  });
  const [displayedError, setDisplayedError] = useState('');

  const focusOnMountRef = useFocusOnMount();

  const submit = () => {
    const error = getBrickError(newBrick);
    setDisplayedError(error);
    if (error == null) {
      addBrick(newBrick);
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.form}>
        <Input
          label="Description"
          value={newBrick.content}
          onChangeText={content => setNewBrick({ ...newBrick, content })}
          numberOfLines={4}
          multiline
          ref={focusOnMountRef}
        />
        <ConceptPicker
          concepts={newBrick.childrenConcepts}
          onChange={childrenConcepts =>
            setNewBrick({ ...newBrick, childrenConcepts })
          }
        />
        <View style={styles.status}>
          <Text style={styles.statusTitle}>Status</Text>
          <StatusPicker
            status={newBrick.status}
            setStatus={status => setNewBrick({ ...newBrick, status })}
          />
        </View>
        <Input placeholder="source" />
        {displayedError !== '' && <Text>{displayedError}</Text>}
        <View style={styles.submit}>
          <Button title="Sauvegarder" onPress={submit} />
        </View>
      </View>
    </ScrollView>
  );
}

BrickMaker.navigationOptions = ({ navigation }) => {
  const concept = navigation.getParam('concept', { concept: '...' });
  const title = `${concept} > Ajouter`;
  return {
    title,
    headerStyle: {
      backgroundColor: '#f4511e'
    }
  };
};

export default BrickMaker;
