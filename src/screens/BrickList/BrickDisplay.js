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
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
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
    width: 30,
    height: 30
  },
  actionText: { textDecorationLine: "underline" },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
      <View style={styles.footer}>
        {hiddenBricks.length != null && (
          <Text style={styles.actionText} onPress={() => setShowAll(!showAll)}>
            {showAll ? "Hide" : "See"} all {hiddenBricks.length} bricks
          </Text>
        )}
        <Button
          containerStyle={styles.buttonAdd}
          icon={{
            name: "add",
            size: 15
          }}
          type="outline"
          onPress={() => navigation.navigate("BrickMaker", { concept })}
        />
      </View>
      <View>
        {showAll &&
          hiddenBricks.map(hiddenBrick => (
            <BrickItemDisplay brick={hiddenBrick} key={hiddenBrick.id} />
          ))}
      </View>
    </View>
  );
}
