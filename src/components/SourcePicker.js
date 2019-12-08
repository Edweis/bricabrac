import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '../hooks/navigation';
import type { SourceT } from '../constants/types';
import { EMPTY_SOURCE } from '../constants/defaults';
import { useProject } from '../hooks/project';

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
