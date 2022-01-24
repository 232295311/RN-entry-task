import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  DeviceEventEmitter,
} from 'react-native';
// import MsgCenter from '../../../libs/msg_center';
// import UIAdpt from '../../../libs/ui_adpt';
import {scaleSize, setSpText2} from '../../../utils/screen';
import {WToast} from 'react-native-smart-tip';
import ActivityCenter from '../../../store/ActivityCenter';
import ChannelCenter from '../../../store/ChannelCenter';


export default function SearchResult() {
  const [visible, setVisible] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [channel, setChannel] = useState<string>(''); //展示的Channel名字 从ActivityCenter的搜索参数中找出并去ChannelCenter获取名字
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  let listener: any = null;
  useEffect(() => {
    const getChannelName = () => {
      const channelId = ActivityCenter.getChannels();
      return ChannelCenter.getChannelName(channelId);
    };
    //监听Search里的搜索事件
    listener = DeviceEventEmitter.addListener('showSearchResult', () => {
      setVisible(true);
      setCount(ActivityCenter.getTotal());
      setChannel(getChannelName());
      setStartTime(ActivityCenter.getAfter('DD/MM'));
      setEndTime(ActivityCenter.getBefore('DD/MM'));
    });
    return () => {
      listener.remove();
    };
  }, []);

  const clearSearch = async () => {
    try {
      await ActivityCenter.searchEvents({
        channels: 0,
        after: 0,
        before: 0,
      });
      // 触发getEventsSuccess事件更新List页面数据
      DeviceEventEmitter.emit('getEventsSuccess');
      setVisible(false);
    } catch (e) {
      WToast.show({data: 'clearSearch失败' + e});
    }
  };

  //渲染查询结果
  const renderResult = () => {
    if (visible) {
      return (
        <View style={styles.result}>
          <View style={styles.info}>
            <Text style={styles.resultCount}>{count} Results</Text>
            <TouchableHighlight
              style={styles.clearBtn}
              underlayColor="#E5FF9F"
              onPress={clearSearch}>
              <Text style={styles.clearBtnText}>CLEAR SEARCH</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.desc}>
            <Text style={styles.descText}>
              Searched for {channel} Activities from {startTime} to {endTime}
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return <>{renderResult()}</>;
}

const styles = StyleSheet.create({
  result: {
    height: scaleSize(68),
    width: '100%',
    backgroundColor: '#FAF9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    height: scaleSize(36),
    width: scaleSize(280),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scaleSize(18),
  },
  resultCount: {
    fontSize: setSpText2(16),
    color: '#8560A9',
    fontWeight: 'bold',
  },
  clearBtn: {
    height: scaleSize(24),
    width: scaleSize(90),
    borderRadius: 20,
    borderColor: '#D5EF7F',
    backgroundColor: '#D5EF7F',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: setSpText2(10),
    color: '#67616D',
  },
  desc: {
    height: scaleSize(32),
    width: scaleSize(280),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  descText: {
    fontSize: setSpText2(12),
    color: '#67616D',
  },
});
