// @flow
import React, { useState } from "react";
import _ from "lodash";
import { FAB } from "react-native-paper";
import {
  View,
  StyleSheet,
  Button,
  Switch,
  TextInput,
  ScrollView,
  Icon
} from "react-native";
import { Text, SearchBar } from "react-native-elements";
import Concepts from "../../components/Concepts";
import { useBricks, addBrick } from "../../hooks";
import { matchBrickWithSearch } from "./helpers";

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    margin: 8
  },
  brickContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    marginBottom: 10
  },
  brickHeader: {},
  brickHeaderTitle: {},
  sectionTitle: {},
  brickHeaderStatus: {},
  brickContent: {},
  brickContentDefinition: {},
  brickContentConcepts: {},
  fab: {
    position: "absolute",
    margin: 34,
    right: 0,
    bottom: 50
  }
});

function BrickList({ navigation }: { navigation: any }) {
  const bricks = useBricks();
  const [search, setSearch] = useState("");
  const ids = _.map(bricks, "id");
  const brickToDisplay = bricks.filter(brick =>
    matchBrickWithSearch(brick, search)
  );
  console.debug("Brick List", {
    ids,
    dif: _.difference(ids, _.uniq(ids)),
    lenght: bricks.length
  });

  // Use FlatList id ScrollView becomes too slow
  return (
    <View>
      <SearchBar onChangeText={setSearch} value={search} />
      <ScrollView style={styles.main}>
        {brickToDisplay.map(brick => (
          <View style={styles.brickContainer} key={brick.id}>
            <View style={styles.brickHeader}>
              <Text>Id :{brick.id}</Text>
              <Text style={styles.brickHeaderTitle}>Title : {brick.title}</Text>
              <Text style={styles.brickHeaderStatus}>
                Status : {brick.status}
              </Text>
            </View>
            <View style={styles.brickContent}>
              <Text style={styles.brickContentDefinition}>
                Definition :{brick.definition}
              </Text>
              <Text style={styles.brickContentConcepts}>
                Concepts :{brick.concepts}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        onPress={() => navigation.navigate("BrickMaker")}
        icon="add"
      />
    </View>
  );
}

BrickList.navigationOptions = {
  title: "List des briques"
};

// <Concepts concepts={brick.concepts && brick.concepts.split('|')} />

export default BrickList;
