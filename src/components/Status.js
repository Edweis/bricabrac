import React from "react";
import { View, StyleSheet } from "react-native";
import type { StatusT } from "../constants/types";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  accepted: { backgroundColor: colors.statusAccepted },
  refused: { backgroundColor: colors.statusRefused },
  none: { backgroundColor: colors.statusNone }
});

export const mapStatusToColor: { [StatusT]: string } = {
  accepted: colors.statusAccepted,
  refused: colors.statusRefused,
  none: colors.statusNone
};

export default function Status({ status }: { status: StatusT }) {
  return <View style={[styles.dot, styles[status]]} />;
}
