import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import ActionModal from '../../components/ActionModal';

function CommentButton(props: {
  onSubmit: (comment: string) => void;
  style?: {};
}) {
  const [displayInput, setDisplayInput] = useState(false);

  return (
    <>
      <Button
        title="Commenter"
        onPress={() => setDisplayInput(true)}
        type="outline"
        containerStyle={props.style}
      />
      <ActionModal
        show={displayInput}
        onSubmit={props.onSubmit}
        onClose={() => setDisplayInput(false)}
        title="Ajouter un commentaire"
        submitText="Commenter"
        multiline
      />
    </>
  );
}

CommentButton.defaultProps = { style: {} };

export default CommentButton;
