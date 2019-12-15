import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import ActionModal from './ActionModal';

type ButtonProps = any;
type Props = {
  modalTitle: string,
  onSubmit: () => void,
} & ButtonProps;
export default function ConfirmButton(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { modalTitle, onSubmit, ...buttonProps } = props;
  return (
    <>
      <Button {...buttonProps} onPress={() => setIsModalOpen(true)} />
      <ActionModal
        show={isModalOpen}
        title={modalTitle}
        submitText={props.title}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
        noInput
      />
    </>
  );
}
