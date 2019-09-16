// @flow
import React, { useState, useContext } from "react";
import { NavigationContext } from "react-navigation";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import type { BrickT } from "../../constants/types";
import Status from "../../components/Status";
import { useBricks } from "../../hooks";

const styles = StyleSheet.create({
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
  brickContentDefinition: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  contentExtra: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  brickContentConcepts: {},
  buttonAdd: {
    width: 100
  }
});

function BrickItemDisplay({ brick }: { brick: BrickT }) {
  return (
    <View style={styles.brickContentDefinition}>
      <Text>{brick.content}</Text>
      <View style={styles.contentExtra}>
        <Text> {brick.childrenConcepts.join("|")}</Text>
        <Status status={brick.status} />
      </View>
    </View>
  );
}

export default function BrickDisplay({ concept }: { concept: string }) {
  const navigation = useContext(NavigationContext);
  const [showAll, setShowAll] = useState(false);

  const allBricks = useBricks();
  const bricks = allBricks.filter(brick => brick.parentConcept === concept);
  const numberBricks = bricks.length;

  if (!bricks.length)
    return <Text style={styles.brickContainer}>No bricks for {concept}</Text>;
  const headBrick = bricks[0];
  const hiddenBricks = bricks.slice(1);

  return (
    <View style={styles.brickContainer}>
      <Text h4 style={styles.brickHeaderTitle}>
        {concept}
      </Text>
      <BrickItemDisplay brick={headBrick} />
      <View>
        <Button
          containerStyle={styles.buttonAdd}
          title="Itérer"
          icon={{
            name: "add",
            size: 15
          }}
          type="outline"
          onPress={() => navigation.navigate("BrickMaker", { concept })}
        />
      </View>
      <Text onPress={() => setShowAll(!showAll)}>
        {showAll ? "Hide" : "See"} all {numberBricks} bricks
      </Text>
      <View>
        {showAll &&
          hiddenBricks.map(hiddenBrick => (
            <BrickItemDisplay brick={hiddenBrick} />
          ))}
      </View>
    </View>
  );
}
