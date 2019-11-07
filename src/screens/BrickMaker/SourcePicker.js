import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';
import type { SourceT } from '../../constants/types';
import { EMPTY_SOURCE } from '../../constants/defaults';
import { useProject } from '../../hooks/project';

type Props = {
  source: SourceT[],
  onChange: (SourceT[]) => void,
  readOnly?: boolean
};
function SourcePicker(props: Props) {
  const navigation = useContext(NavigationContext);
  const [projectSource] = useProject();
  const { source, readOnly } = props;
  const onSelect = (newSource: SourceT) => {
    props.onChange(newSource);
    navigation.pop();
  };

  // When we have a project source, the projectSource is the default source
  useEffect(() => {
    if (projectSource != null) props.onChange(projectSource);
  }, [projectSource]);

  const displayedSource = source === '' ? EMPTY_SOURCE : source;

  return (
    <View>
      <Input
        label="source"
        value={displayedSource}
        onFocus={() => navigation.push('SourceList', { onSelect })}
        disabled={readOnly}
      />
    </View>
  );
}
SourcePicker.defaultProps = { readOnly: false };

export default SourcePicker;
