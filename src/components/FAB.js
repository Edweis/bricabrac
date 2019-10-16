// @flow
import React from "react";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 34,
    right: 0,
    bottom: 0,
    alignSelf: "flex-end"
  }
});

export default (props: any) => {
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <FAB style={[styles.fab, props.styles]} icon="add" {...props} />;
};
