import React from 'react';
import { Switch, StyleSheet, Text, View } from 'react-native';

type Props = {
  isDefinition: boolean,
  onChange: boolean => void,
  readOnly?: boolean,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function RelationshipPicker(props: Props) {
  const { isDefinition, onChange, readOnly } = props;
  return (
    <View style={styles.container}>
      <Switch
        value={isDefinition}
        onValueChange={onChange}
        disabled={readOnly}
      />
      <Text> Est-ce une definition ?</Text>
    </View>
  );
}
RelationshipPicker.defaultProps = { readOnly: false };
export default RelationshipPicker;
