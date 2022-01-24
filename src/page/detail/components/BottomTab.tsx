import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {scaleSize, setSpText2} from '../../../utils/screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {imgAssets} from '../../../config/ImgAsset';
import {TextInput} from 'react-native-gesture-handler';

let commentInput = null;
// ios-heart
export default (props: any) => {
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false); //是否展示输入评论的输入框
  const [comment, setComment] = useState<string>('');

  //绑定commeny元素
  const bindComment = (el: any) => {
    commentInput = el;
  };
  const commentChange = (value: string) => {
    setComment(value);
  };
  //   //焦点离开comment
  //   const commentBlur = () => {
  //     setCommentStyle(styles.inputItemFocus);
  //   };
  //   //焦点进入comment
  //   const commentFocus = () => {
  //     setCommentStyle(styles.inputItem);
  //   };
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
              //   onBlur={commentFocus}
              //   onFocus={commentBlur}
            />
          </View>
          <View style={styles.rightInputContent}>
            <FontAwesome5
              name={'paper-plane'}
              size={scaleSize(24)}
              style={{color: '#8560A9'}}></FontAwesome5>
          </View>
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
            <Ionicons
              name={'ios-heart-outline'}
              size={scaleSize(24)}></Ionicons>
          </View>
          <View style={styles.rightContent}>
            <Image
              style={styles.joinIcon}
              source={imgAssets.checkOutline}></Image>
            <Text style={styles.joinText}>Join</Text>
          </View>
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
