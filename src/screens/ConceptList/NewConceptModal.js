import React, { useState } from 'react';
import { Text } from 'react-native';
import FAB from '../../components/FAB';

import ActionModal from '../../components/ActionModal';

export default function NewConceptModal(props: { onCreate: () => void }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ActionModal
        show={showModal}
        onSubmit={props.onCreate}
        onClose={() => setShowModal(false)}
        title="Nouveau concept"
        submitText="Créér"
      >
        <Text>Custom !</Text>
      </ActionModal>
      <FAB onPress={() => setShowModal(true)} />
    </>
  );
}
