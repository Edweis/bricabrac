import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Input, Divider, Button } from 'react-native-elements';
import { useNavigation } from '../../hooks/navigation';
import { getCurrentUserId } from '../../firebase';
import ConceptPicker from './ConceptPicker';
import StatusPicker from './StatusPicker';
import SourcePicker from './SourcePicker';
import CommentButton from './CommentButton';
import RelationshipPicker from './RelationshipPicker';
import Comments from './Comments';
import {
  setBrick,
  useFocusOnMount,
  useUser,
  updateBrickComment
} from '../../hooks';
import { checkBrickError } from './helpers';
import { EMPTY_BRICK } from '../../constants/defaults';
import { BrickT } from '../../constants/types';
import colors from '../../constants/colors';

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
  submit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  submitItem: { flexGrow: 1, marginLeft: 10, marginRight: 10 },
  author: { alignSelf: 'flex-end' }
});

const useFilledBricked = (brick: BrickT): BrickT =>
  useMemo(
    () => ({
      ...EMPTY_BRICK,
      ...brick
    }),
    [brick]
  );

function BrickMaker() {
  const navigation = useNavigation();
  const isReadOnly = navigation.getParam('readOnly');
  const originalBrick = navigation.getParam('brick');

  const displayedBrick = useFilledBricked(originalBrick);
  const isAuthor = getCurrentUserId() === displayedBrick.author;

  const [newBrick, setNewBrick] = useState(displayedBrick);
  const [displayedError, setDisplayedError] = useState('');
  const [isEditEnabled, setIsEditEnable] = useState(!isReadOnly);

  const focusOnMountRef = useFocusOnMount();

  const submit = () => {
    checkBrickError(
      newBrick,
      () => {
        setBrick(newBrick);
        navigation.goBack();
      },
      setDisplayedError
    );
    setIsEditEnable(false);
  };

  const updateBrick = (data: $Shape<BrickT>): BrickT => {
    const updatedBrick = { ...newBrick, ...data };
    setNewBrick(updatedBrick);
    // only for status, we save and push on readOnly
    if (!isEditEnabled) setBrick(updatedBrick);
  };

  const author = useUser(newBrick.author);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <ScrollView contentContainerStyle={styles.form}>
        <Input
          label="Description"
          placeholder="description de la brique..."
          value={newBrick.content}
          onChangeText={content => updateBrick({ content })}
          numberOfLines={4}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          ref={focusOnMountRef}
          disabled={!isEditEnabled}
          multiline
        />
        <Divider style={styles.divider} />
        <SourcePicker
          source={newBrick.source}
          onChange={source => updateBrick({ source })}
          readOnly={!isEditEnabled}
        />
        <Divider style={styles.divider} />
        <ConceptPicker
          concepts={newBrick.childrenConcepts}
          onChange={childrenConcepts => updateBrick({ childrenConcepts })}
          readOnly={!isEditEnabled}
        />
        <Divider style={styles.divider} />
        <RelationshipPicker
          relationship={newBrick.relationship}
          setReltionship={relationship => updateBrick({ relationship })}
          readOnly={!isEditEnabled}
        />
        <Divider style={styles.divider} />
        <StatusPicker
          status={newBrick.status}
          setStatus={status => updateBrick({ status })}
        />
        {displayedError !== '' && <Text>{displayedError}</Text>}
        <View style={styles.submit}>
          {isEditEnabled ? (
            <Button title="Sauvegarder" onPress={submit} />
          ) : (
            <>
              {isAuthor && (
                <Button
                  title="Editer"
                  onPress={() => setIsEditEnable(true)}
                  type="outline"
                  containerStyle={styles.submitItem}
                />
              )}
              <CommentButton
                onSubmit={comment => updateBrickComment(newBrick.id, comment)}
                style={styles.submitItem}
              />
            </>
          )}
        </View>
        {!isEditEnabled && <Comments brickId={newBrick.id} />}
      </ScrollView>
      {!isEditEnabled && (
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
  const headerStyle = readOnly ? {} : { backgroundColor: colors.orange };
  return { title, headerStyle };
};

export default BrickMaker;
