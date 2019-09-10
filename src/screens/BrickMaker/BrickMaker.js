import React, { useState } from "react";
import { View, StyleSheet, Button, Switch, TextInput } from "react-native";
import { Text, Input } from "react-native-elements";
import Concepts from "../../components/Concepts";
import Status from "./Status";
import { useBricks, addBrick, DEFAULT_BRIC } from "../../hooks";
import useSubscribedState from "../../hooks/helpers";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    padding: 10,
    height: "100%",
    justifyContent: "space-between"
  },
  definition: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  sectionTitle: {},
  inputContainer: { height: 50, fontSize: 40 },
  containerStyle: { height: 50, fontSize: 50 }
});

function BrickMaker() {
  const [concepts, setConcepts] = useSubscribedState([]);
  const [status, setStatus] = useSubscribedState(DEFAULT_BRIC.status);

  const [title, setTitle] = useSubscribedState(DEFAULT_BRIC.title);
  const [description, setDescrition] = useSubscribedState(
    DEFAULT_BRIC.description
  );
  const [isDefinition, setIsDefinition] = useSubscribedState(
    DEFAULT_BRIC.isDefinition
  );

  const submit = () => {
    const brick = {
      title,
      description,
      isDefinition,
      concepts,
      status
    };
    // console.debug('about to add', { brick });
    addBrick(brick);
  };

  return (
    <View style={styles.main}>
      <View style={styles.form}>
        <Input
          placeholder="Titre de la brique"
          value={title}
          onChangeText={setTitle}
        />
        <Input
          placeholder="Description ..."
          value={description}
          onChangeText={setDescrition}
          numberOfLines={4}
          multiline
        />
        <Concepts concepts={concepts} />
        <Text style={styles.sectionTitle}>Status</Text>
        <Status status={status} setStatus={setStatus} />
        <View style={styles.definition}>
          <Switch value={isDefinition} onValueChange={setIsDefinition} />
          <Text>Brique de définition</Text>
        </View>
        <Input placeholder="source" />
        <View style={styles.submit}>
          <Button title="Sauvegarder" onPress={submit} />
        </View>
      </View>
    </View>
  );
}

BrickMaker.navigationOptions = {
  title: "Nouvelle brique"
};

export default BrickMaker;
