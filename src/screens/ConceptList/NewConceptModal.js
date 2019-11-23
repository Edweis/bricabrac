import React, { useState } from 'react';
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
      />
      <FAB onPress={() => setShowModal(true)} />
    </>
  );
}
