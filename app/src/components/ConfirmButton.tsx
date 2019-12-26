import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import ActionModal from './ActionModal';

type ButtonProps = typeof Button;
type Props = {
  modalTitle: string;
  onSubmit: () => void;
  title: string;
} & ButtonProps;
export default function ConfirmButton(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { modalTitle, onSubmit, ...buttonProps } = props;
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
