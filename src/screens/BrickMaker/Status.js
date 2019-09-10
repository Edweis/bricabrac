import React from "react";
import { Picker } from "react-native";
import type { StatusT } from "../../constants/types";

type Props = {
  status: StatusT,
  setStatus: StatusT => void
};
const mapStatustoLevel: { [StatusT]: string } = {
  accepted: "success",
  refused: "error",
  none: "warning"
};
const translateStatus: { [StatusT]: string } = {
  accepted: "acceptée",
  refused: "réfutée",
  none: "sans avis"
};
export default function Status(props: Props) {
  return (
    <Picker
      selectedValue={props.status}
      onValueChange={value => props.setStatus(value)}
    >
      {["accepted", "refused", "none"].map(value => (
        <Picker.Item label={translateStatus[value]} value={value} key={value} />
      ))}
    </Picker>
  );
}
