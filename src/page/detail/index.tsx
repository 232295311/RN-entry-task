import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CommonHeader from '../../commonComponent/CommonHeader';
import DetailCenter from '../../store/DetailCenter';
import {WToast} from 'react-native-smart-tip';
import DetailTop from './components/DetailTop';
import ScrollTab from './components/ScrollTab';
import Desc from './components/Desc';
import When from './components/When';
import {scaleSize} from '../../utils/screen';
export default (props: any) => {
  const id = props.route.params.id;
  const [detail, setDetail] = useState<EventDetail | null>(null);
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [comments, setComments] = useState<CommentDetail[]>([]);
  useEffect(() => {
    console.log('id~~~~~~', id);
    if (id) {
      initPage(id);
    } else {
      initPage(1);
    }
    // DetailCenter.initDetailPage();
  }, []);
  const initPage = async (id: number) => {
    try {
      await DetailCenter.initDetailPage(id);
      setDetail(DetailCenter.getDetail());
      setParticipants(DetailCenter.getParticipants());
      setComments(DetailCenter.getComments());
    } catch (e) {
      WToast.show({
        data: 'failed to get Event Detail data, please try again.' + e,
      });
    }
  };
  return (
    <View style={styles.root}>
      <CommonHeader pageType="DetailPage"></CommonHeader>
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
      <View style={styles.Where}></View>
      <View style={styles.Participants}></View>
      <View style={styles.Comments}></View>
      <View style={styles.BottomTab}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(250, 249, 252,1)',
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
  Where: {},
  Participants: {},
  Comments: {},
  BottomTab: {},
});
