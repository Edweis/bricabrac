import React, { useState } from 'react';
import { View, StyleSheet, Button, Switch, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import Concepts from './Concepts';
import Status from './Status';
import { useBrics, addBrick } from '../../hooks';
import useSubscribedState from '../../hooks/helpers';

const now = new Date().toLocaleDateString('fr-FR');

export default function BrickMaker() {
  return null;
  const bric = useBrics()[0];

  console.debug({ bric });
  const [concepts, setConcepts] = useSubscribedState([]);
  const [status, setStatus] = useSubscribedState(bric.status);
  const [title, setTitle] = useSubscribedState(bric.title);
  const [description, setDescrition] = useSubscribedState(bric.description);
  const [isDefinition, setIsDefinition] = useSubscribedState(bric.isDefinition);

  const submit = () => {
    const brick = { title, description, isDefinition, concepts, status };
    console.debug('about to add', { brick });
    addBrick(brick);
  };

  return (
    <View style={styles.main}>
      <View style={styles.form}>
        <Text>le {now}</Text>
        <View style={styles.definition}>
          <Switch value={isDefinition} onValueChange={setIsDefinition} />
          <Text>Brique de définition</Text>
        </View>
        <TextInput placeholder="source" />
        <Text h4 style={styles.sectionTitle}>
          Brique
        </Text>
        <TextInput placeholder="Titre de la brique" value={title} onChangeText={setTitle} />
        <TextInput
          placeholder="Description ..."
          value={description}
          onChangeText={setDescrition}
          numberOfLines={4}
          multiline
        />
        <Text h4 style={styles.sectionTitle}>
          Concepts
        </Text>
        <Concepts concepts={concepts} />
        <Text h4 style={styles.sectionTitle}>
          Status
        </Text>
        <Status status={status} setStatus={setStatus} />
      </View>
      <View style={styles.submit}>
        <Button title="Sauvegarder" onPress={submit} />
      </View>
    </View>
  );
}

BrickMaker.navigationOptions = {
  title: 'Nouvelle brique',
};

const styles = StyleSheet.create({
  main: { display: 'flex', padding: 10, height: '100%', justifyContent: 'space-between' },
  definition: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: { margin: 10, textAlign: 'center' },
});
