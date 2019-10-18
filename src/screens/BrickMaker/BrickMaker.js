import React, { useState, useContext } from 'react';
import { NavigationContext } from 'react-navigation';
import { TextInput, View, StyleSheet, Button, ScrollView } from 'react-native';
import { Text, Input, Divider } from 'react-native-elements';
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
  containerStyle: { height: 50, fontSize: 50 },
  divider: { marginTop: 10, marginBottom: 10 }
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
          placeholder="description de la brique..."
          value={newBrick.content}
          onChangeText={content => setNewBrick({ ...newBrick, content })}
          numberOfLines={4}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          multiline
          ref={focusOnMountRef}
        />
        <Divider style={styles.divider} />
        <ConceptPicker
          concepts={newBrick.childrenConcepts}
          onChange={childrenConcepts =>
            setNewBrick({ ...newBrick, childrenConcepts })
          }
        />
        <Divider style={styles.divider} />
        <StatusPicker
          status={newBrick.status}
          setStatus={status => setNewBrick({ ...newBrick, status })}
        />
        <Divider style={styles.divider} />
        <Input label="source" />
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
