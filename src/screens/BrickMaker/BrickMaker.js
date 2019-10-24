import React, { useState, useContext, useMemo } from 'react';
import { NavigationContext } from 'react-navigation';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { Text, Input, Divider } from 'react-native-elements';
import ConceptPicker from './ConceptPicker';
import StatusPicker from './StatusPicker';
import SourcePicker from './SourcePicker';
import { addBrick, useFocusOnMount, useUser } from '../../hooks';
import { checkBrickError } from './helpers';
import { EMPTY_BRICK } from '../../constants/defaults';
import { BrickT } from '../../constants/types';

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
  divider: { marginTop: 10, marginBottom: 10 },
  submit: { marginTop: 10 },
  author: { alignSelf: 'flex-end' }
});

function BrickMaker() {
  const navigation = useContext(NavigationContext);
  const isReadOnly = navigation.getParam('readOnly');
  const originalBrick = navigation.getParam('brick');
  const displayedBrick = useMemo(
    () => ({
      ...EMPTY_BRICK,
      ...originalBrick
    }),
    [originalBrick]
  );
  const [newBrick, setNewBrick] = useState(displayedBrick);
  const [displayedError, setDisplayedError] = useState('');

  const focusOnMountRef = useFocusOnMount();

  const submit = () =>
    checkBrickError(
      newBrick,
      () => {
        addBrick(newBrick);
        navigation.goBack();
      },
      setDisplayedError
    );

  const updateBrick = (data: $Shape<BrickT>): BrickT => {
    const updatedBrick = { ...newBrick, ...data };
    if (isReadOnly) setNewBrick(updatedBrick);
    else checkBrickError(updatedBrick, () => setNewBrick(updatedBrick));
  };

  const author = useUser(newBrick.author);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.form}>
        <Input
          label="Description"
          placeholder="description de la brique..."
          value={newBrick.content}
          onChangeText={content => updateBrick({ content })}
          numberOfLines={4}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          ref={focusOnMountRef}
          disabled={isReadOnly}
          multiline
        />
        <Divider style={styles.divider} />
        <SourcePicker
          source={newBrick.source}
          onChange={source => updateBrick({ source })}
          readOnly={isReadOnly}
        />
        <Divider style={styles.divider} />
        <ConceptPicker
          concepts={newBrick.childrenConcepts}
          onChange={childrenConcepts => updateBrick({ childrenConcepts })}
          readOnly={isReadOnly}
        />
        <Divider style={styles.divider} />
        <StatusPicker
          status={newBrick.status}
          setStatus={status => updateBrick({ status })}
        />
        {displayedError !== '' && <Text>{displayedError}</Text>}
        {!isReadOnly && (
          <View style={styles.submit}>
            <Button title="Sauvegarder" onPress={submit} />
          </View>
        )}
      </View>
      {isReadOnly && (
        <View style={styles.author}>
          <Text style={styles.authorText}>Brique de {author.email}</Text>
        </View>
      )}
    </ScrollView>
  );
}

BrickMaker.navigationOptions = ({ navigation }) => {
  const { parentConcept } = navigation.getParam('brick', {
    parentConcept: '...'
  });
  const readOnly = navigation.getParam('readOnly', false);
  const title = readOnly ? parentConcept : `${parentConcept} > Ajouter`;
  const headerStyle = readOnly ? {} : { backgroundColor: '#f4511e' };
  return { title, headerStyle };
};

export default BrickMaker;
