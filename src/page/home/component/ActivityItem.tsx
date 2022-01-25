import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
} from 'react-native';
import NavigationUtil from '../../../navigation/NavigationUtil';
import {imgAssets} from '../../../config/ImgAsset';
import {scaleSize, setSpText2} from '../../../utils/screen';
import ActivityCenter from '../../../store/ActivityCenter';
import moment from 'moment-timezone';
import Toast from 'react-native-root-toast';

export default function ActivityItem(props: {data: EventDetail}) {
  const [isGoing, setIsGoing] = useState<boolean>(false); //是否已经参加
  const [isLike, setIsLike] = useState<boolean>(false); //是否喜欢
  const [imageUri, setImageUri] = useState<any>({
    uri: props.data.images!.length > 0 ? props.data.images![0] : '',
  });
  let listener2: any = null;

  useEffect(() => {
    listener2 = DeviceEventEmitter.addListener('DetailLikesOrGoing', id => {
      if (id === props.data.id) {
        setIsLike(ActivityCenter.getItemById(props.data?.id)?.me_likes!);
        setIsGoing(ActivityCenter.getItemById(props.data?.id)?.me_going!);
      }
    });
    return () => {
      listener2.remove();
    };
  }, []);

  useEffect(() => {
    if (props.data.images!.length > 0) {
      setImageUri({
        uri: props.data.images![0],
      });
    } else {
      setImageUri(imgAssets.notFound);
    }
    if (props.data) {
      setIsGoing(props.data?.me_going);
      setIsLike(props.data?.me_likes);
    }
  }, [props.data]);

  //点击Going参加活动
  const clickJoin = async (isGoing: boolean) => {
    try {
      if (isGoing) {
        await ActivityCenter.joinEvent({
          id: props.data.id,
        });
        Toast.show('operation success');
      } else {
        await ActivityCenter.quitEvent({
          id: props.data.id,
        });
        Toast.show('cancel participating success');
      }
      setIsGoing(isGoing);
    } catch (e) {
      Toast.show(e);
    }
  };

  //点击爱心
  const clickLike = async (isLike: boolean) => {
    try {
      if (isLike) {
        await ActivityCenter.likeEvent({
          id: props.data.id,
        });
        Toast.show('operation success');
      } else {
        await ActivityCenter.disLikeEvent({
          id: props.data.id,
        });
        Toast.show('cancel liking success');
      }
      setIsLike(isLike);
    } catch (e) {
      Toast.show(e);
    }
  };

  //点击进入详情页面 传参id
  const clickItem = () => {
    NavigationUtil.goPage(
      {
        id: props.data.id,
      },
      'DetailPage',
    );
  };

  //渲染go逻辑
  const renderGo = () => {
    if (isGoing) {
      return (
        <TouchableWithoutFeedback onPress={e => e.preventDefault()}>
          <View
            style={styles.actionItem}
            onTouchEnd={() => {
              clickJoin(false);
            }}>
            <Image style={styles.goIcon} source={imgAssets.activityGoing} />
            <Text style={styles.goText}>i am going</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={e => e.preventDefault()}>
          <View
            style={styles.actionItem}
            onTouchEnd={() => {
              clickJoin(true);
            }}>
            <Image style={styles.goIcon} source={imgAssets.activityGo} />
            <Text style={styles.goText}>{props.data.goings_count} Going</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  //渲染like逻辑
  const renderLike = () => {
    if (isLike) {
      return (
        <TouchableWithoutFeedback onPress={e => e.preventDefault()}>
          <View
            style={styles.actionItem}
            onTouchEnd={() => {
              clickLike(false);
            }}>
            <Image style={styles.likeIcon} source={imgAssets.activityLiking} />
            <Text style={styles.likeText}>i like it</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={e => e.preventDefault()}>
          <View
            style={styles.actionItem}
            onTouchEnd={() => {
              clickLike(true);
            }}>
            <Image style={styles.likeIcon} source={imgAssets.activityLike} />
            <Text style={styles.likeText}>{props.data.likes_count} Likes</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  //渲染详细描述
  const renderDesc = () => {
    if (props.data.images!.length > 0) {
      return (
        <View style={styles.descImg}>
          <Text numberOfLines={4} style={styles.descText}>
            {props.data.description}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.desc}>
          <Text numberOfLines={3} style={styles.descText}>
            {props.data.description}
          </Text>
        </View>
      );
    }
  };

  //渲染图片
  const renderPic = () => {
    if (props.data.images!.length > 0) {
      return (
        <View style={styles.picPanel}>
          <Image
            style={styles.pic}
            source={imageUri}
            onError={e => {
              setImageUri(imgAssets.notFound);
            }}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  //渲染日期
  const renderDate = () => {
    if (props.data.images!.length > 0) {
      return (
        <Text style={styles.timeText}>
          {moment(props.data.begin_time).format('DD MMMM YYYY')} -{' '}
          {moment(props.data.end_time).format('DD MMMM YYYY')}
        </Text>
      );
    } else {
      return (
        <Text style={styles.timeText}>
          {moment(props.data.begin_time).format('DD MMMM YYYY HH:mm')} -{' '}
          {moment(props.data.begin_time).format('DD MMMM YYYY HH:mm')}
        </Text>
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.activityItem}
      activeOpacity={0.8}
      onPress={clickItem}>
      <View style={styles.users}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{uri: props.data.creator.avatar}}
          />
          <Text style={styles.nickName}>{props.data.creator.username}</Text>
        </View>
        <View style={styles.channelName}>
          <Text style={styles.channelNameText}>{props.data.channel.name}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.textPanel}>
          <View style={styles.title}>
            <Text numberOfLines={2} style={styles.titleText}>
              {props.data.name}
            </Text>
          </View>
          <View style={styles.time}>
            <Image style={styles.timeIcon} source={imgAssets.activityTime} />
            {renderDate()}
          </View>
          {renderDesc()}
          <View style={styles.action}>
            {renderGo()}
            {renderLike()}
          </View>
        </View>
        {renderPic()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activityItem: {
    width: '100%',
    padding: scaleSize(16),
    alignItems: 'center',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  users: {
    flexDirection: 'row',
    height: scaleSize(20),
    width: scaleSize(288),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleSize(4),
  },
  userInfo: {
    flexDirection: 'row',
    height: scaleSize(20),
    alignItems: 'center',
  },
  avatar: {
    height: scaleSize(20),
    width: scaleSize(20),
    borderRadius: 20,
  },
  nickName: {
    fontSize: setSpText2(12),
    color: '#67616D',
    marginLeft: scaleSize(8),
    marginTop: scaleSize(1),
  },
  channelName: {
    height: scaleSize(20),
    width: scaleSize(89),
    borderRadius: 20,
    borderColor: '#D3C1E5',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelNameText: {
    fontSize: setSpText2(12),
    color: '#8560A9',
  },
  content: {
    flexDirection: 'row',
    width: scaleSize(288),
  },
  picPanel: {
    flex: scaleSize(72),
    alignItems: 'flex-end',
  },
  pic: {
    height: scaleSize(64),
    width: scaleSize(64),
    marginTop: scaleSize(4),
  },
  textPanel: {
    flex: scaleSize(216),
    alignItems: 'flex-start',
  },
  title: {
    height: scaleSize(36),
    marginVertical: scaleSize(4),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: setSpText2(18),
    color: '#453257',
    fontWeight: 'bold',
  },
  time: {
    flexDirection: 'row',
    marginVertical: scaleSize(4),
  },
  timeIcon: {
    height: scaleSize(12),
    width: scaleSize(12),
    marginRight: scaleSize(5),
  },
  timeText: {
    fontSize: setSpText2(12),
    color: '#8560A9',
  },
  desc: {
    height: scaleSize(45),
    marginVertical: scaleSize(8),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  descImg: {
    height: scaleSize(60),
    marginVertical: scaleSize(8),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  descText: {
    fontSize: setSpText2(14),
    color: '#67616D',
  },
  action: {
    height: scaleSize(15),
    width: scaleSize(216),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: scaleSize(4),
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  goIcon: {
    height: scaleSize(12),
    width: scaleSize(9.8),
    marginRight: scaleSize(5),
  },
  goText: {
    marginRight: scaleSize(31),
    fontSize: setSpText2(12),
    color: '#453257',
  },
  likeIcon: {
    height: scaleSize(10),
    width: scaleSize(9.2),
    marginRight: scaleSize(5),
  },
  likeText: {
    fontSize: setSpText2(12),
    color: '#453257',
  },
});
