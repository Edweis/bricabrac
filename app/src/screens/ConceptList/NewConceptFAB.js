import React, { useState } from 'react';
import FAB from '../../components/FAB';
import ConceptEditor from '../../components/ConceptEditor';

export default function NewConceptFAB() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ConceptEditor show={showModal} onClose={() => setShowModal(false)} />
      <FAB onPress={() => setShowModal(true)} />
    </>
  );
}
