import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { NavigationContext } from 'react-navigation';
import type { SourceT } from '../../constants/types';

const styles = StyleSheet.create({});

type Props = {
  source: SourceT[],
  onChange: (SourceT[]) => void
};
export default function SourcePicker(props: Props) {
  const navigation = useContext(NavigationContext);
  const { source } = props;
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
      />
    </View>
  );
}
