import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, Input } from "react-native-elements";
import Concepts from "../../components/Concepts";
import Status from "./Status";
import { addBrick, useFocusOnMount } from "../../hooks";
import { getBrickError } from "./helpers";
import { DEFAULT_BRICK } from "../../constants/defaults";

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
  status: {},
  statusTitle: {},
  inputContainer: { height: 50, fontSize: 40 },
  containerStyle: { height: 50, fontSize: 50 }
});

function BrickMaker(props: { navigation: any }) {
  const [newBrick, setNewBrick] = useState({
    ...DEFAULT_BRICK,
    parentConcept: props.navigation.getParam("concept")
  });
  const [displayedError, setDisplayedError] = useState("");

  const focusOnMountRef = useFocusOnMount();

  const submit = () => {
    const error = getBrickError(newBrick);
    setDisplayedError(error);
    if (error == null) {
      addBrick(newBrick);
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.form}>
        <Text h4>{newBrick.parentConcept}</Text>
        <Input
          placeholder="Description ..."
          value={newBrick.content}
          onChangeText={d => setNewBrick({ ...newBrick, content: d })}
          numberOfLines={4}
          multiline
          ref={focusOnMountRef}
        />
        <Concepts concepts={newBrick.childrenConcepts} />
        <View style={styles.status}>
          <Text style={styles.statusTitle}>Status</Text>
          <Status
            status={newBrick.status}
            setStatus={s => setNewBrick({ ...newBrick, status: s })}
          />
        </View>
        <Input placeholder="source" />
        {displayedError && <Text>{displayedError}</Text>}
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
