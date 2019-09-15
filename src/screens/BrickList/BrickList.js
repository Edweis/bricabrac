// @flow
import React, { useState } from "react";
import _ from "lodash";
import { FAB } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, SearchBar, Button } from "react-native-elements";
import { useBricks } from "../../hooks";
import { matchBrickWithSearch } from "./helpers";
import NewConceptModal from "./NewConceptModal";

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
  },
  buttonAdd: {
    width: 100
  }
});

function BrickList({ navigation }: { navigation: any }) {
  const bricks = useBricks();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const brickPerParent = _(bricks)
    .filter(brick => matchBrickWithSearch(brick, search))
    .groupBy("parentConcept");

  // Use FlatList id ScrollView becomes too slow
  return (
    <View>
      <SearchBar onChangeText={setSearch} value={search} />
      <ScrollView style={styles.main}>
        {brickPerParent
          .map((childrenBricks, parentConcept) => {
            console.debug({ childrenBricks, parentConcept, brickPerParent });
            const numberBricks = childrenBricks.length;
            const brick = childrenBricks[0];
            return (
              <View style={styles.brickContainer} key={brick.parentConcept}>
                <View style={styles.brickHeader}>
                  <Text h4 style={styles.brickHeaderTitle}>
                    {parentConcept}
                  </Text>
                  <Text>#Bricks : {numberBricks}</Text>
                  <Text style={styles.brickHeaderStatus}>
                    Status : {brick.status}
                  </Text>
                </View>
                <View style={{}}>
                  <View style={styles.brickContent}>
                    <Text style={styles.brickContentDefinition}>
                      Content : {brick.content}
                    </Text>
                    <Text style={styles.brickContentConcepts}>
                      Concepts : {brick.childrenConcepts.join("|")}
                    </Text>
                  </View>
                </View>
                <Button
                  containerStyle={styles.buttonAdd}
                  title="Itérer"
                  icon={{
                    name: "add",
                    size: 15
                  }}
                  type="outline"
                  onPress={() =>
                    navigation.navigate("BrickMaker", {
                      concept: parentConcept
                    })}
                />
              </View>
            );
          })
          .value()}
      </ScrollView>
      <FAB style={styles.fab} onPress={() => setShowModal(true)} icon="add" />
      <NewConceptModal
        show={showModal}
        onSubmit={concept => navigation.navigate("BrickMaker", { concept })}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
}

/* onPress={() => navigation.navigate("BrickMaker")} */
BrickList.navigationOptions = {
  title: "List des briques"
};

// <Concepts concepts={brick.concepts && brick.concepts.split('|')} />

export default BrickList;
