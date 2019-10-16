import React, { useContext } from "react";
import { NavigationContext } from "react-navigation";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Status from "../../components/Status";
import { useBricks } from "../../hooks";
import FAB from "../../components/FAB";

const styles = StyleSheet.create({
  main: {}
});
function BrickDisplay() {
  const navigation = useContext(NavigationContext);
  const concept = navigation.getParam("concept");
  const bricks = useBricks(concept);

  if (!bricks.length)
    return <Text style={styles.brickContainer}>No bricks for {concept}</Text>;

  return (
    <>
      <View style={styles.brickContainer}>
        {bricks.map(brick => (
          <View style={styles.brickContentDefinition} key={brick.id}>
            <View style={styles.contentExtra}>
              <Status status={brick.status} />
              <Text> {brick.childrenConcepts.join("|")}</Text>
            </View>
            <Text>{brick.content}</Text>
          </View>
        ))}
      </View>
      <FAB onPress={() => navigation.navigate("BrickMaker", { concept })} />
    </>
  );
}

BrickDisplay.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("concept")
});

export default BrickDisplay;
