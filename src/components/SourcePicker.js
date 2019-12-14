import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { useNavigation } from '../hooks/navigation';
import type { SourceT } from '../constants/types';
import { EMPTY_SOURCE } from '../constants/defaults';
import { useProject } from '../hooks/project';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  icon: { marginRight: 16 },
  text: { maxWidth: '80%' },
});

type Props = {
  source: SourceT[],
  onChange: (SourceT[]) => void,
  readOnly?: boolean,
};
function SourcePicker(props: Props) {
  const navigation = useNavigation();
  const [projectSource] = useProject();
  const { source, readOnly } = props;
  const onSelect = (newSource: SourceT) => {
    props.onChange(newSource);
    navigation.pop();
  };

  // When we have a project source, the projectSource is the default source
  useEffect(() => {
    if (projectSource != null && !readOnly) props.onChange(projectSource);
  }, [projectSource]);

  const displayedSource = !source || source === '' ? EMPTY_SOURCE : source;

  return (
    <View style={styles.container}>
      <Icon name="format-quote" type="material" />
      <Text style={styles.text}>{displayedSource}</Text>
      <Button
        title="Editer"
        onPress={() => navigation.push('SourceList', { onSelect })}
        type="outline"
      />
    </View>
  );

  return (
    <Input
      label="source"
      value={displayedSource}
      onFocus={() => navigation.push('SourceList', { onSelect })}
      disabled={readOnly}
    />
  );
}
SourcePicker.defaultProps = { readOnly: false };

export default SourcePicker;
