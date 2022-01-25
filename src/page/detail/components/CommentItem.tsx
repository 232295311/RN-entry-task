import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import {scaleSize, setSpText2} from '../../../utils/screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {renderDiffNow} from '../../../utils/formatTime';
export default (props: any) => {
  const comment: CommentDetail = props.comment;
  const clickReplyUser = (username: string) => {
    DeviceEventEmitter.emit('replySpecificUser', username);
  };
  return (
    <View style={styles.container}>
      <Image style={styles.leftImg} source={{uri: comment.user.avatar}}></Image>
      <View style={styles.right}>
        <View style={styles.rightTitleContainer}>
          <View style={styles.rightTitle}>
            <Text style={styles.userName}>{comment.user.username}</Text>
            <Text style={styles.userTime}>
              {renderDiffNow(comment.create_time)}
            </Text>
          </View>
          <Ionicons
            name={'md-arrow-undo-outline'}
            size={setSpText2(16)}
            style={styles.transIcon}
            onPress={() => {
              clickReplyUser(comment.user.username);
            }}
          />
        </View>
        <View style={styles.rightDesc}>
          <Text style={styles.comment}>{comment.comment}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(16),
    marginTop: scaleSize(16),
  },
  leftImg: {
    width: scaleSize(32),
    height: scaleSize(32),
    borderRadius: scaleSize(16),
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: scaleSize(12),
    flexShrink: 1,
    // backgroundColor: 'red',
  },
  rightTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  rightTitle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userName: {
    color: '#8560A9',
    fontSize: setSpText2(12),
  },
  userTime: {
    color: '#BABABA',
    fontSize: setSpText2(10),
    marginLeft: scaleSize(12),
  },
  transIcon: {
    color: '#D5EF7F',
  },
  rightDesc: {
    marginTop: scaleSize(4),
    paddingRight: scaleSize(16),
  },
  comment: {
    color: '#666666',
    fontSize: setSpText2(14),
  },
});
