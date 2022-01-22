import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CommonHeader from '../../commonComponent/CommonHeader';
import DetailCenter from '../../store/DetailCenter';
import {WToast} from 'react-native-smart-tip';
export default (props: any) => {
  const id = props.route.params.id;
  const [detail, setDetail] = useState<EventDetail | {}>({});
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [comments, setComments] = useState<CommentDetail[]>([]);
  useEffect(() => {
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
        <Text>{JSON.stringify(detail)}</Text>
      </View>
      <View style={styles.ScrollTab}>
        <Text>{JSON.stringify(participants)}</Text>
      </View>
      <View style={styles.Desc}>
        <Text>{JSON.stringify(comments)}</Text>
      </View>
      <View style={styles.When}></View>
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
  },
  DetailTop: {},
  ScrollTab: {},
  Desc: {},
  When: {},
  Where: {},
  Participants: {},
  Comments: {},
  BottomTab: {},
});
