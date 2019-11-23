// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import ConceptEditor from '../../components/ConceptEditor';
import type { ConceptT } from '../../constants/types';

const styles = StyleSheet.create({ container: { marginRight: 16 } });
export default function EditConceptButton(props: { concept: ConceptT }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <Icon
        name="ios-pricetags"
        onPress={() => setShowModal(true)}
        type="ionicon"
      />
      <ConceptEditor
        concept={props.concept}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
}
