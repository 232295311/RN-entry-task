import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native';
import {imgAssets} from '../../../config/ImgAsset';
import {scaleSize, setSpText2} from '../../../utils/screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const iconNumberOfHide = 8; //participants和likes达到这个数字时，将隐藏多余的并展示向下的icon
export default (props: any) => {
  const participants: Participants[] = props.participants;
  const likes: LikesUser[] = props.likes;
  const [participantsMore, setParticipantsMore] = useState<boolean>(false);
  const [likesMore, setLikesMore] = useState<boolean>(false);

  useEffect(() => {
    if (participants?.length > 0 && likes?.length > 0) {
      if (participants.length > iconNumberOfHide) {
        setParticipantsMore(true);
      } else {
        setParticipantsMore(false);
      }
      if (likes.length > iconNumberOfHide) {
        setLikesMore(true);
      } else {
        setParticipantsMore(false);
      }
    }
  }, [participants, likes]);

  return (
    <>
      {participants?.length > 0 && likes?.length > 0 && (
        <View style={styles.container}>
          <View style={styles.topContent}>
            <Image style={styles.icon} source={imgAssets.activityGo}></Image>
            <Text
              style={styles.iconText}>{`${participants.length} going`}</Text>
            <View style={styles.avatarContainer}>
              {participantsMore
                ? participants
                    .filter((item, index) => {
                      return index < iconNumberOfHide;
                    })
                    .map((item, index) => {
                      // 第七个不渲染图片，渲染成Icon
                      return index === iconNumberOfHide - 1 ? (
                        <Ionicons
                          name={'ios-chevron-down-circle-outline'}
                          size={setSpText2(24)}
                          style={styles.avatarIcon}
                          onPress={() => {
                            setParticipantsMore(false);
                          }}
                        />
                      ) : (
                        <Image
                          key={item.id}
                          source={{uri: item.avatar}}
                          style={styles.avatar}></Image>
                      );
                    })
                : participants.map((item, index) => {
                    return (
                      <Image
                        key={item.id}
                        source={{uri: item.avatar}}
                        style={styles.avatar}></Image>
                    );
                  })}
            </View>
          </View>
          <View style={styles.bottomContent}>
            <Image style={styles.icon} source={imgAssets.activityLike}></Image>
            <Text style={styles.iconText}>{`${likes.length} likes`}</Text>
            <View style={styles.bottomAvatarContainer}>
              {likesMore
                ? likes
                    .filter((item, index) => {
                      return index < iconNumberOfHide;
                    })
                    .map((item, index) => {
                      // 第七个不渲染图片，渲染成Icon
                      return index === iconNumberOfHide - 1 ? (
                        <Ionicons
                          name={'ios-chevron-down-circle-outline'}
                          size={setSpText2(24)}
                          style={styles.avatarIcon}
                          onPress={() => {
                            setLikesMore(false);
                          }}
                        />
                      ) : (
                        <Image
                          key={item.id}
                          source={{uri: item.avatar}}
                          style={styles.avatar}></Image>
                      );
                    })
                : likes.map((item, index) => {
                    return (
                      <Image
                        key={item.id}
                        source={{uri: item.avatar}}
                        style={styles.avatar}></Image>
                    );
                  })}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(8),
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(16),
    // backgroundColor: 'green',
  },
  topContent: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: scaleSize(8),
    paddingBottom: scaleSize(4),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#E8E8E8',
    // backgroundColor: 'red',
  },
  bottomContent: {
    flexDirection: 'row',
    paddingTop: scaleSize(12),
    // backgroundColor: 'red',
  },
  icon: {
    width: scaleSize(14),
    height: scaleSize(14),
  },
  iconText: {
    fontSize: setSpText2(12),
    color: '#67616D',
    marginLeft: scaleSize(8),
  },
  avatarContainer: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: scaleSize(21),
    flexWrap: 'wrap',
    flexGrow: 1,
    flexShrink: 1,
    // backgroundColor: 'blue',
  },
  bottomAvatarContainer: {
    flexDirection: 'row',
    marginLeft: scaleSize(28),
    flexWrap: 'wrap',
    flexGrow: 1,
    flexShrink: 1,
    // backgroundColor: 'blue',
  },

  avatar: {
    width: scaleSize(24),
    height: scaleSize(24),
    borderRadius: scaleSize(12),
    marginRight: scaleSize(7.5),
    marginBottom: scaleSize(8),
  },
  avatarIcon: {
    color: '#AC8EC9',
    marginRight: scaleSize(7),
  },
});
