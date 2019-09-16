// @flow
import React, { useState } from "react";
import _ from "lodash";
import { FAB } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { useBricks } from "../../hooks";
import { matchBrickWithSearch } from "./helpers";
import NewConceptModal from "./NewConceptModal";
import BrickDisplay from "./BrickDisplay";

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    margin: 8
  },
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
  const [showModal, setShowModal] = useState(false);

  const concepts = _(bricks)
    .filter(brick => matchBrickWithSearch(brick, search))
    .map("parentConcept")
    .uniq()
    .sortBy()
    .value();

  // Use FlatList if ScrollView becomes too slow
  return (
    <View>
      <SearchBar onChangeText={setSearch} value={search} />
      <ScrollView style={styles.main}>
        {concepts.map(parentConcept => (
          <BrickDisplay concept={parentConcept} />
        ))}
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

BrickList.navigationOptions = {
  title: "List des briques"
};

// <Concepts concepts={brick.concepts && brick.concepts.split('|')} />

export default BrickList;
