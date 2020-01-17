import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

import { useBrickComments } from '../../hooks/bricks';
import { useUserEmail } from '../../hooks/users';
import { CommentT } from '../../constants/types';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: { fontWeight: 'bold' },
  container: { marginTop: 10 },
});

const IS_URL = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const IS_IMAGE = /\.(jpeg|jpg|gif|png)$/;
const isTextLinkImage = (text: string) =>
  text.match(IS_URL) != null && text.match(IS_IMAGE) != null;

const Comment = (props: { comment: CommentT }) => {
  const { comment } = props;
  const email = useUserEmail(comment.author);
  const isImage = isTextLinkImage(comment.text); // url.match(/\.(jpeg|jpg|gif|png)$/) != null
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>{email}</Text>
        <Text>{moment(comment.datetime.toDate()).fromNow()}</Text>
      </View>
      {isImage ? (
        <Image
          style={{ width: 66, height: 58 }}
          source={{
            uri: comment.text,
          }}
        />
      ) : (
        <Text>{comment.text}</Text>
      )}
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
