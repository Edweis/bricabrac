import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useBrickComments, useUser } from '../../hooks';
import { CommentT } from '../../constants/types';

const Comment = (props: { comment: CommentT }) => {
  const { comment } = props;
  const user = useUser(comment.author);
  return (
    <View>
      <Text>{user.email}</Text>
      <Text>{comment.text}</Text>
    </View>
  );
};

const Comments = (props: { brickId: string }) => {
  const comments = useBrickComments(props.brickId);
  return (
    <View>
      {comments.map(comment => (
        <Comment comment={comment} />
      ))}
    </View>
  );
};
export default Comments;
