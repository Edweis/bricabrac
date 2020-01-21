import React, { PropsWithChildren } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: { flex: 1 },
});

type Props = PropsWithChildren<{ contentContainerStyle: {} }>;
const ElasticView = (props: Props) => (
  <KeyboardAvoidingView style={styles.scrollContainer} behavior="padding">
    <ScrollView
      contentContainerStyle={[styles.container, props.contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
    >
      {props.children}
    </ScrollView>
  </KeyboardAvoidingView>
);

ElasticView.defaultProps = { contentContainerStyle: {} };

ElasticView.navigationOptions = {
  title: 'ElasticView',
};

export default ElasticView;
