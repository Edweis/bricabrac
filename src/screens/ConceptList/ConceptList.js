// @flow
import React, { useState } from "react";
import _ from "lodash";
import { StyleSheet, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import FAB from "../../components/FAB";
import { useBricks } from "../../hooks";
import { matchBrickWithSearch } from "./helpers";
import NewConceptModal from "./NewConceptModal";
import ConceptItem from "./ConceptItem";

const styles = StyleSheet.create({
  content: {},
  fab: {
    position: "absolute",
    margin: 34,
    right: 0,
    bottom: 50
  }
});

function ConceptList({ navigation }: { navigation: any }) {
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
    <>
      <SearchBar onChangeText={setSearch} value={search} />
      <ScrollView style={styles.content}>
        {concepts.map(parentConcept => (
          <ConceptItem concept={parentConcept} key={parentConcept} />
        ))}
      </ScrollView>
      <NewConceptModal
        show={showModal}
        onSubmit={concept => navigation.navigate("BrickMaker", { concept })}
        onClose={() => setShowModal(false)}
      />
      <FAB onPress={() => setShowModal(true)} />
    </>
  );
}

ConceptList.navigationOptions = {
  title: "List des briques"
};

// <Concepts concepts={brick.concepts && brick.concepts.split('|')} />

export default ConceptList;
