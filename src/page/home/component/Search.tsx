import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native';
// import MsgCenter from '../../../store/UserCenter';
import {imgAssets} from '../../../config/ImgAsset';
import {scaleSize, setSpText2} from '../../../utils/screen';
import ActivityCenter from '../../../store/ActivityCenter';
import moment from 'moment-timezone';
import ChannelCenter from '../../../store/ChannelCenter';
import {WToast} from 'react-native-smart-tip';
//@ts-ignore
import EventBus from 'react-native-event-bus';
const dateArray: string[] = [
  'ANYTIME',
  'TODAY',
  'TOMORROW',
  'THIS WEEK',
  'THIS MONTH',
  'LATER',
];

const dateMap: any = {
  '': {after: 0, before: 0},
  ANYTIME: {after: 0, before: 0},
  LATER: {after: 0, before: 0},
  TODAY: {
    after: moment().startOf('day').valueOf(),
    before: moment().endOf('day').valueOf(),
  },
  TOMORROW: {
    after: moment().startOf('day').add(1, 'd').valueOf(),
    before: moment().endOf('day').add(1, 'd').valueOf(),
  },
  'THIS WEEK': {
    after: moment().startOf('week').valueOf(),
    before: moment().endOf('week').valueOf(),
  },
  'THIS MONTH': {
    after: moment().startOf('month').valueOf(),
    before: moment().endOf('month').valueOf(),
  },
};

interface SearchProps {
  setOpenSearch(param: boolean): void;
}
export default function Search(props: SearchProps) {
  const [chooseDate, setChooseDate] = useState<string>('');
  const [chooseChannel, setChooseChannel] = useState<number>(0);

  const channelArray: ChannelDetail[] = ChannelCenter.getList();

  useEffect(() => {
    return () => {};
  }, []);

  //点击搜索
  const clickSearch = async () => {
    if (chooseDate === '' && chooseChannel === 0) {
      WToast.show({data: 'Please choose Date or Channel.'});
      return;
    }
    try {
      const date = dateMap[chooseDate];
      await ActivityCenter.searchEvents({
        channels: chooseChannel,
        after: moment(date.after).add(8, 'h').valueOf(), //搜索时需要把东八区时间转成UTC标准时间
        before: moment(date.before).add(8, 'h').valueOf(), //搜索时需要把东八区时间转成UTC标准时间
      });
      props.setOpenSearch(false);
      // 触发展示SearchResult组件的事件 和 List组件更新事件
      EventBus.getInstance().fireEvent('showSearchResult');
      EventBus.getInstance().fireEvent('getEventsSuccess');
    } catch (e) {
      WToast.show({data: 'search failed, please try again.' + e});
    }
  };
  //渲染日期数据
  const renderDateItem = () => {
    return (
      <>
        {dateArray.map(date => (
          <View
            style={chooseDate == date ? styles.itemMark : styles.dateItem}
            key={date}
            onTouchEnd={() => {
              clickDate(date);
            }}>
            <Text
              style={
                chooseDate == date ? styles.itemTextMark : styles.itemText
              }>
              {date}
            </Text>
          </View>
        ))}
      </>
    );
  };

  //渲染渠道数据
  const renderChannelItem = () => {
    return (
      <>
        {channelArray.map(channel => (
          <View
            style={
              chooseChannel == channel.id ? styles.itemMark : styles.channelItem
            }
            key={channel.id}
            onTouchEnd={() => {
              clickChannel(channel.id);
            }}>
            <Text
              style={
                chooseChannel == channel.id
                  ? styles.itemTextMark
                  : styles.itemText
              }>
              {channel.name}
            </Text>
          </View>
        ))}
      </>
    );
  };

  //渲染搜索条件
  const renderSearchDesc = () => {
    if (chooseDate == '' && chooseChannel == 0) {
      return null;
    } else {
      let channel = '';
      if (chooseChannel != 0) {
        channel = ChannelCenter.getChannelName(chooseChannel) + ' activities';
      }
      let date = '';
      if (chooseDate != '') {
        if (chooseDate == 'ANYTIME' || chooseDate == 'LATER') {
          date = ' from ' + chooseDate;
        } else {
          const tmp = dateMap[chooseDate];
          date =
            ' from ' +
            moment(tmp.after).format('DD/MM') +
            ' to ' +
            moment(tmp.before).format('DD/MM');
        }
      }
      return (
        <View style={styles.searchBtn}>
          <Text style={styles.searchDesc}>
            {channel}
            {date}
          </Text>
        </View>
      );
    }
  };

  //点击日期
  const clickDate = (date: string) => {
    if (chooseDate != date) {
      setChooseDate(date);
    } else {
      setChooseDate('');
    }
  };

  //点击渠道
  const clickChannel = (channelId: number) => {
    if (chooseChannel != channelId) {
      setChooseChannel(channelId);
    } else {
      setChooseChannel(0);
    }
  };

  return (
    <View style={styles.search}>
      <View style={styles.header}>
        <View style={styles.panel}>
          <View style={styles.title}>
            <Text style={styles.titleText}>DATE</Text>
            <View style={styles.dateLine}></View>
          </View>
          <View style={styles.list}>{renderDateItem()}</View>
        </View>
        <View style={styles.panel}>
          <View style={styles.title}>
            <Text style={styles.titleText}>CHANNEL</Text>
            <View style={styles.channelLine}></View>
          </View>
          <View style={styles.list}>{renderChannelItem()}</View>
        </View>
      </View>
      <TouchableHighlight
        style={styles.body}
        underlayColor="#E5FF9F"
        onPress={clickSearch}>
        <View style={styles.searchPanel}>
          <View style={styles.searchBtn}>
            <Image style={styles.pic} source={imgAssets.search} />
            <Text style={styles.searchText}>SEARCH</Text>
          </View>
          {renderSearchDesc()}
        </View>
      </TouchableHighlight>
    </View>
  );
}

//样式定义
const styles = StyleSheet.create({
  search: {
    height: '100%',
    width: '100%',
  },
  header: {
    flex: scaleSize(507),
    backgroundColor: '#453257',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  panel: {
    width: scaleSize(235),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(10),
  },
  title: {
    height: scaleSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: setSpText2(12),
    color: '#AC8EC9',
    fontWeight: 'bold',
    marginBottom: scaleSize(3),
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: scaleSize(235),
  },
  itemText: {
    fontSize: setSpText2(12),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginHorizontal: scaleSize(8),
  },
  itemTextMark: {
    fontSize: setSpText2(12),
    color: '#453257',
    fontWeight: 'bold',
    marginHorizontal: scaleSize(8),
  },
  itemMark: {
    height: scaleSize(24),
    borderRadius: 20,
    borderColor: '#E5F7A9',
    backgroundColor: '#E5F7A9',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: scaleSize(5),
  },
  dateItem: {
    height: scaleSize(24),
    borderRadius: 20,
    borderColor: '#453257',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: scaleSize(5),
  },
  channelItem: {
    height: scaleSize(24),
    borderRadius: 20,
    borderColor: '#D3C1E5',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: scaleSize(5),
  },
  dateLine: {
    height: scaleSize(1),
    width: scaleSize(25),
    borderColor: '#AC8EC9',
    backgroundColor: '#AC8EC9',
    borderWidth: 1,
  },
  channelLine: {
    height: scaleSize(1),
    width: scaleSize(45),
    borderColor: '#AC8EC9',
    backgroundColor: '#AC8EC9',
    borderWidth: 1,
  },
  body: {
    flex: scaleSize(65),
    backgroundColor: '#D5EF7F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPanel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtn: {
    height: scaleSize(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pic: {
    height: scaleSize(12),
    width: scaleSize(12),
    marginRight: scaleSize(6),
  },
  searchText: {
    fontSize: setSpText2(16),
    color: '#453257',
    fontWeight: 'bold',
  },
  searchDesc: {
    fontSize: setSpText2(10),
    color: '#8560A9',
  },
});
