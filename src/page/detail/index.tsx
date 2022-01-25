import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import CommonHeader from '../../commonComponent/CommonHeader';
import DetailCenter from '../../store/DetailCenter';
import {WToast} from 'react-native-smart-tip';
import DetailTop from './components/DetailTop';
import ScrollTab from './components/ScrollTab';
import Desc from './components/Desc';
import When from './components/When';
import Where from './components/Where';
import Participants from './components/Participants';
import CommentItem from './components/CommentItem';
import BottomTab from './components/BottomTab';
import {scaleSize} from '../../utils/screen';

let listener: any = null;
let listener2: any = null;
export default (props: any) => {
  const id = props.route.params.id;
  const [detail, setDetail] = useState<EventDetail | null>(null);
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [likes, setLikes] = useState<LikesUser[]>([]);
  const [comments, setComments] = useState<CommentDetail[]>([]);

  useEffect(() => {
    console.log('id~~~~~~', id);
    if (id) {
      initPage(id);
    } else {
      initPage(1);
    }
    listener = DeviceEventEmitter.addListener('DetailLikesOrGoing', () => {
      console.log('~~~~~~~~~~~detail页面，触发喜欢或参加的监听');
      setParticipants(DetailCenter.getParticipants());
      setLikes(DetailCenter.getLike());
    });
    listener2 = DeviceEventEmitter.addListener('PostCommentSuccess', () => {
      console.log('~~~~~~~~~~~detail页面，触发评论成功的监听');
      setComments(DetailCenter.getComments());
    });
    return () => {
      console.log('~~~~退出DetailPage');
      listener.remove();
      listener2.remove();
    };
  }, []);

  const initPage = async (id: number) => {
    try {
      await DetailCenter.initDetailPage(id);
      setDetail(DetailCenter.getDetail());
      setParticipants(DetailCenter.getParticipants());
      setComments(DetailCenter.getComments());
      setLikes(DetailCenter.getLike());
    } catch (e) {
      WToast.show({
        data: 'failed to get Event Detail data, please try again.' + e,
      });
    }
  };

  const renderCommentItem = (item: any) => {
    return <CommentItem key={item.id} comment={item}></CommentItem>;
  };
  return (
    <View style={styles.root}>
      <CommonHeader pageType="DetailPage"></CommonHeader>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View style={styles.DetailTop}>
          <DetailTop data={detail}></DetailTop>
        </View>
        <View style={styles.ScrollTab}>
          <ScrollTab type={'Details'}></ScrollTab>
        </View>
        <View style={styles.Desc}>
          <Desc data={detail}></Desc>
        </View>
        <View style={styles.When}>
          <When data={detail}></When>
        </View>
        <View style={styles.Where}>
          <Where data={detail}></Where>
        </View>
        <View style={styles.Participants}>
          <Participants
            participants={participants}
            likes={likes}></Participants>
        </View>
        <View style={styles.Comments}>
          {comments.map((item, index) => {
            return renderCommentItem(item);
          })}
        </View>
      </ScrollView>

      <BottomTab detail={detail}></BottomTab>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(250, 249, 252,1)',
    flexDirection: 'column',
  },
  DetailTop: {
    paddingBottom: scaleSize(12),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#E8E8E8',
  },
  ScrollTab: {
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#E8E8E8',
  },
  Desc: {
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#E8E8E8',
    paddingBottom: scaleSize(20),
  },
  When: {
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#E8E8E8',
  },
  Where: {
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#E8E8E8',
  },
  Participants: {
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#E8E8E8',
  },
  Comments: {},
});
