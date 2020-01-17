import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Input, Divider, Button } from 'react-native-elements';
import { useNavigation, NavigationOptionsProps } from '../../hooks/navigation';
import { getCurrentUserId } from '../../firebase';
import ConceptPicker from './ConceptPicker';
import StatusPicker from './StatusPicker';
import SourcePicker from '../../components/SourcePicker';
import CommentButton from './CommentButton';
import IsDefinitionPicker from './IsDefinitionPicker';
import Comments from './Comments';
import { setBrick, deleteBrick, updateBrickComment } from '../../hooks/bricks';
import { useUserEmail } from '../../hooks/users';
import { useFocusOnMount } from '../../hooks/helpers';
import { checkBrickError } from './helpers';
import { EMPTY_BRICK } from '../../constants/defaults';
import { BrickT } from '../../constants/types';
import colors from '../../constants/colors';
import ConfirmButton from '../../components/ConfirmButton';
import HeaderIconButton from '../../components/HeaderIconButton';

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    padding: 10,
    height: '100%',
    justifyContent: 'space-between',
  },
  definition: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 10,
  },
  submitItem: { flexGrow: 1, marginLeft: 10, marginRight: 10 },
  footer: { alignSelf: 'stretch' },
  deleteButton: { backgroundColor: colors.errorBackground },
  deleteContainer: { marginTop: 10 },
});

const SAVE_ACTION_PROPS = 'saveAction';

const useFilledBricked = (brick: BrickT): BrickT =>
  useMemo(
    () => ({
      ...EMPTY_BRICK,
      author: getCurrentUserId(),
      ...brick,
    }),
    [brick],
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

  const focusOnMountRef = useFocusOnMount<Input>(isReadOnly);

  const submit = useCallback(() => {
    checkBrickError(
      newBrick,
      () => {
        setBrick(newBrick);
        navigation.goBack();
      },
      setDisplayedError,
    );
    setIsEditEnable(false);
  }, [newBrick]);

  // Give action to header
  useEffect(() => {
    if (isEditEnabled) navigation.setParams({ [SAVE_ACTION_PROPS]: submit });
  }, [isEditEnabled, newBrick]);

  const updateBrick = (data: Partial<BrickT>) => {
    const updatedBrick = { ...newBrick, ...data };
    setNewBrick(updatedBrick);
    // only for status, we save and push on readOnly
    if (!isEditEnabled) setBrick(updatedBrick);
  };
  const email = useUserEmail(newBrick.author);
  return (
    <ScrollView
      contentContainerStyle={styles.main}
      keyboardShouldPersistTaps="handled"
    >
      <ScrollView keyboardShouldPersistTaps="handled">
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
        <IsDefinitionPicker
          isDefinition={newBrick.isDefinition}
          onChange={isDefinition => updateBrick({ isDefinition })}
          readOnly={!isEditEnabled}
        />
        <Divider style={styles.divider} />
        <StatusPicker
          status={newBrick.status}
          setStatus={status => updateBrick({ status })}
        />
        {displayedError !== '' && <Text>{displayedError}</Text>}
        {!isEditEnabled && <Comments brickId={newBrick.id} />}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.submit}>
          {!isEditEnabled && (
            <CommentButton
              onSubmit={comment => updateBrickComment(newBrick.id, comment)}
              style={styles.submitItem}
            />
          )}
          {!isEditEnabled && isAuthor && (
            <Button
              title="Editer"
              onPress={() => setIsEditEnable(true)}
              type="outline"
              containerStyle={styles.submitItem}
            />
          )}
        </View>
        {isEditEnabled && <Button title="Sauvegarder" onPress={submit} />}
        {!isEditEnabled && isAuthor && (
          <ConfirmButton
            title="Supprimer"
            modalTitle="Êtes vous sur de vouloir supprimer cette brique ?"
            onSubmit={() => {
              deleteBrick(newBrick.id);
              navigation.pop();
            }}
            type="solid"
            buttonStyle={styles.deleteButton}
            containerStyle={styles.deleteContainer}
          />
        )}
        {!isEditEnabled && email != null && <Text>Brique de {email}</Text>}
      </View>
    </ScrollView>
  );
}

BrickMaker.navigationOptions = (props: NavigationOptionsProps) => {
  const { navigation } = props;
  const { parentConcept } = navigation.getParam('brick', {
    parentConcept: '...',
  });
  const readOnly = navigation.getParam('readOnly', false);
  const title = readOnly ? parentConcept : `${parentConcept} > Ajouter`;
  const headerStyle = readOnly ? {} : { backgroundColor: colors.orange };
  const saveAction = navigation.getParam(SAVE_ACTION_PROPS, null); // should be populated on construction
  const headerRight = saveAction ? (
    <HeaderIconButton name="ios-checkmark" onPress={saveAction} size={32} />
  ) : null;
  return { title, headerStyle, headerRight };
};

export default BrickMaker;
