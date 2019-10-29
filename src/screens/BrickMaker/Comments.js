import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

import { useBrickComments, useUser } from '../../hooks';
import { CommentT } from '../../constants/types';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  author: { fontWeight: 'bold' },
  container: { marginTop: 10 }
});

const Comment = (props: { comment: CommentT }) => {
  const { comment } = props;
  const user = useUser(comment.author);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>{user.email}</Text>
        <Text>{moment(comment.datetime.toDate()).fromNow()}</Text>
      </View>
      <Text>{comment.text}</Text>
    </View>
  );
};

const Comments = (props: { brickId: string }) => {
  const comments = useBrickComments(props.brickId);
  return (
    <View>
      {comments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </View>
  );
};
export default Comments;
