import React, {useState, useEffect} from 'react';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import ActivityCenter from '../../../store/ActivityCenter';
import {scaleSize, setSpText2} from '../../../utils/screen';
import ActivityItem from './ActivityItem';
import Empty from './Empty';
import {WToast} from 'react-native-smart-tip';
import ChannelCenter from '../../../store/ChannelCenter';
//@ts-ignore
import EventBus from 'react-native-event-bus';

export default function List() {
  const [total, setTotal] = useState<number>(ActivityCenter.getTotal());
  const [hasMore, setHasMore] = useState<boolean>(ActivityCenter.getHasMore());
  const [activityList, setActivityList] = useState<EventDetail[]>(
    ActivityCenter.getList(),
  );

  useEffect(() => {
    loadList();
    loadChannelList();
    const listener = EventBus.getInstance().addListener(
      'getEventsSuccess',
      () => {
        setTotal(ActivityCenter.getTotal());
        setHasMore(ActivityCenter.getHasMore());
        setActivityList(ActivityCenter.getList());
      },
    );
    return () => {
      EventBus.getInstance().removeListener(listener);
    };
  }, []);

  //布局类型 分为有图片和没有图片两种
  const listLayout = () => {
    return new LayoutProvider(
      index => {
        const images = activityList[index].images || [];
        if (images.length > 0) {
          return 'image';
        } else {
          return 'common';
        }
      },
      (type, dim) => {
        switch (type) {
          case 'image':
            dim.height = scaleSize(218);
            dim.width = scaleSize(360);
            break;
          case 'common':
            dim.height = scaleSize(203);
            dim.width = scaleSize(360);
            break;
          default:
            break;
        }
      },
    );
  };

  //列表数据
  const listData = () => {
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    return dataProvider.cloneWithRows(activityList);
  };

  //不同类型渲染方式
  const listRowRender = (type: any, data: EventDetail) => {
    return <ActivityItem data={data}></ActivityItem>;
  };

  //获取列表数据
  const loadList = async () => {
    try {
      const res = await ActivityCenter.getEvents();
      setTotal(ActivityCenter.getTotal());
      setHasMore(ActivityCenter.getHasMore());
      setActivityList(ActivityCenter.getList());
    } catch (e) {
      WToast.show({data: 'load events data failed, please try again' + e});
    }
  };
  //获取channel数据
  const loadChannelList = async () => {
    try {
      const res = await ChannelCenter.getChannels();
    } catch (e) {
      WToast.show({data: 'load channels data failed, please try again' + e});
    }
  };

  //下拉加载更多
  const loadMore = () => {
    console.log('进来loadMore了', hasMore);
    if (hasMore) {
      //拉活动列表
      loadList();
    } else {
      WToast.show({data: 'no more events'});
    }
  };

  //渲染列表
  function renderList() {
    if (total <= 0) {
      return <Empty />;
    } else {
      return (
        <RecyclerListView
          layoutProvider={listLayout()}
          dataProvider={listData()}
          rowRenderer={listRowRender}
          onEndReachedThreshold={300}
          onEndReached={loadMore}
        />
      );
    }
  }

  return <>{renderList()}</>;
}
