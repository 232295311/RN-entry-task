import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {scaleSize, setSpText2} from '../../../utils/screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {imgAssets} from '../../../config/ImgAsset';
import {TextInput} from 'react-native-gesture-handler';
import ActivityCenter from '../../../store/ActivityCenter';
import DetailCenter from '../../../store/DetailCenter';
import Toast from 'react-native-root-toast';

let commentInput = null;
let listener: any = null;
export default (props: any) => {
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false); //是否展示输入评论的输入框
  const [comment, setComment] = useState<string>(''); //输入的评论内容 发送后清空

  const [isGoing, setIsGoing] = useState<boolean | undefined>(false); //是否已经参加
  const [isLike, setIsLike] = useState<boolean | undefined>(false); //是否喜欢

  useEffect(() => {
    if (props.detail) {
      setIsGoing(props.detail?.me_going);
      setIsLike(props.detail?.me_likes);
    }
  }, [props.detail]);
  useEffect(() => {
    listener = DeviceEventEmitter.addListener(
      'replySpecificUser',
      (userName: string) => {
        setShowCommentInput(true);
        setComment(`@${userName} `);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);
  //绑定comment元素
  const bindComment = (el: any) => {
    commentInput = el;
  };
  const commentChange = (value: string) => {
    setComment(value);
  };

  //点击Going参加活动
  const clickJoin = async (isGoing: boolean) => {
    try {
      if (isGoing) {
        await ActivityCenter.joinEvent({
          id: props.detail?.id,
        });
        await DetailCenter.updateParticipants(props.detail?.id);
        DeviceEventEmitter.emit('DetailLikesOrGoing', props.detail?.id);
        Toast.show('operation success');
      } else {
        await ActivityCenter.quitEvent({
          id: props.detail?.id,
        });
        await DetailCenter.updateParticipants(props.detail?.id);
        DeviceEventEmitter.emit('DetailLikesOrGoing', props.detail?.id);
        Toast.show('cancel participating success');
      }
      setIsGoing(isGoing);
    } catch (e) {
      Toast.show(e);
    }
  };

  //点击爱心
  const clickLike = async (isLiking: boolean) => {
    try {
      if (isLiking) {
        await ActivityCenter.likeEvent({
          id: props.detail?.id,
        });
        await DetailCenter.updateLikes(props.detail?.id);
        DeviceEventEmitter.emit('DetailLikesOrGoing', props.detail?.id);
        Toast.show('operation success');
      } else {
        await ActivityCenter.disLikeEvent({
          id: props.detail?.id,
        });
        await DetailCenter.updateLikes(props.detail?.id);
        DeviceEventEmitter.emit('DetailLikesOrGoing', props.detail?.id);
        Toast.show('cancel liking success');
      }
      setIsLike(isLiking);
    } catch (e) {
      Toast.show(e);
    }
  };

  //点击飞机按钮 发送评论
  const clickPostComment = async (comment: string) => {
    try {
      if (comment) {
        await DetailCenter.postComment(props.detail?.id, comment);

        DeviceEventEmitter.emit('PostCommentSuccess');
        Toast.show('comment success');
      } else {
        Toast.show('please input comment');
      }
    } catch (e) {
      Toast.show(e);
    }
  };
  return (
    <View style={styles.container}>
      {showCommentInput ? (
        <>
          <View style={styles.leftInputContent}>
            <Ionicons
              name={'close-sharp'}
              size={scaleSize(24)}
              style={{color: 'white'}}
              onPress={() => {
                setShowCommentInput(false);
              }}></Ionicons>
            <TextInput
              style={styles.textInput}
              placeholder={'Leave your comment here'}
              placeholderTextColor="#D3C1E5"
              value={comment}
              //   maxLength={30}
              ref={bindComment}
              onChangeText={commentChange}
            />
          </View>
          <TouchableOpacity
            style={styles.rightInputContent}
            onPress={() => {
              clickPostComment(comment);
            }}>
            <FontAwesome5
              name={'paper-plane'}
              size={scaleSize(24)}
              style={{color: '#8560A9'}}></FontAwesome5>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.leftContent}>
            <Ionicons
              name={'md-chatbubble-ellipses-outline'}
              size={scaleSize(24)}
              onPress={() => {
                setShowCommentInput(true);
              }}></Ionicons>
            {isLike ? (
              <Ionicons
                name={'ios-heart'}
                size={scaleSize(24)}
                style={{color: '#D5EF7F'}}
                onPress={() => {
                  clickLike(false);
                }}></Ionicons>
            ) : (
              <Ionicons
                name={'ios-heart-outline'}
                size={scaleSize(24)}
                onPress={() => {
                  clickLike(true);
                }}></Ionicons>
            )}
          </View>

          {isGoing ? (
            <TouchableOpacity
              onPress={() => {
                clickJoin(false);
              }}
              style={styles.rightContent}>
              <Image
                style={styles.joinIcon}
                source={imgAssets.activityGoing}></Image>
              <Text style={styles.joinedText}>I am going</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                clickJoin(true);
              }}
              style={styles.rightContent}>
              <Image
                style={styles.joinIcon}
                source={imgAssets.checkOutline}></Image>
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: scaleSize(56),
    backgroundColor: '#8560A9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: scaleSize(42),
    paddingRight: scaleSize(42),
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5EF7F',
    paddingLeft: scaleSize(38),
    paddingRight: scaleSize(38),
  },
  joinIcon: {
    width: scaleSize(24),
    height: scaleSize(24),
  },
  joinText: {
    fontSize: setSpText2(14),
    color: '#788C36',
    marginLeft: scaleSize(12),
    fontWeight: 'bold',
  },
  joinedText: {
    fontSize: setSpText2(14),
    color: '#8560A9',
    marginLeft: scaleSize(12),
    fontWeight: 'bold',
  },
  leftInputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: scaleSize(5),
    paddingRight: scaleSize(14),
  },
  rightInputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5EF7F',
    paddingLeft: scaleSize(18),
    paddingRight: scaleSize(18),
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: scaleSize(32),
    borderRadius: scaleSize(20),
    marginLeft: scaleSize(5),
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(20),
  },
});
