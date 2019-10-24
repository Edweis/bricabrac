import React, { useContext } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';
import type { SourceT } from '../../constants/types';

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

  return (
    <View>
      <Input
        label="source"
        value={source}
        onFocus={() => navigation.push('SourceList', { onSelect })}
        disabled={readOnly}
      />
    </View>
  );
}
SourcePicker.defaultProps = { readOnly: false };

export default SourcePicker;
