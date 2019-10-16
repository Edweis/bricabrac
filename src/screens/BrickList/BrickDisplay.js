// @flow
import React, { useContext } from "react";
import { NavigationContext } from "react-navigation";
import { ListItem } from "react-native-elements";
import { useBricks } from "../../hooks";

export default function BrickDisplay({ concept }: { concept: string }) {
  const navigation = useContext(NavigationContext);

  const bricks = useBricks(concept);

  if (!bricks.length)
    return <ListItem title={concept} subtitle="No bricks !" bottomDivider />;
  const headBrick = bricks[0];

  return (
    <ListItem
      title={concept}
      rightSubtitle={bricks.length.toString()}
      subtitle={headBrick.content}
      onPress={() => navigation.navigate("BrickDisplay", { concept })}
      bottomDivider
      chevron
    />
  );
}
