import React, { useContext } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';
import type { SourceT } from '../../constants/types';
import { EMPTY_SOURCE } from '../../constants/defaults';

type Props = {
  source: SourceT[],
  onChange: (SourceT[]) => void,
  readOnly?: boolean
};
function SourcePicker(props: Props) {
  const navigation = useContext(NavigationContext);
  const { source, readOnly } = props;
  const onSelect = (newSource: SourceT) => {
    props.onChange(newSource);
    navigation.pop();
  };
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
