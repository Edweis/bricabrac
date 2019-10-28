// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { BrickT } from '../../constants/types';
import { formatConceptTitle } from './helpers';
import Status from '../Status';

export default function BrickTitle({
  brick,
  asConcept
}: {
  brick: BrickT,
  asConcept: boolean
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Status status={brick.status} marginRight />
      <Text>
        {asConcept
          ? formatConceptTitle(brick.parentConcept)
          : brick.parentConcept}
      </Text>
    </View>
  );
}
