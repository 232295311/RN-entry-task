import React, {useState, useEffect} from 'react';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import ActivityCenter from '../../../store/ActivityCenter';
import {scaleSize, setSpText2} from '../../../utils/screen';
import ActivityItem from './ActivityItem';
import Empty from './Empty';
import {WToast} from 'react-native-smart-tip';

export default function List() {
  const [total, setTotal] = useState<number>(ActivityCenter.getTotal());
  const [hasMore, setHasMore] = useState<boolean>(ActivityCenter.getHasMore());
  const [activityList, setActivityList] = useState<EventDetail[]>(
    ActivityCenter.getList(),
  );

  useEffect(() => {
    loadList();
    // const id1 = MsgCenter.addMsgListener('getEventsSuccess', (data: any) => {
    //   setTotal(ActivityCenter.getTotal());
    //   setHasMore(ActivityCenter.getHasMore());
    //   setActivityList(ActivityCenter.getList());
    // });
    // return () => {
    //   MsgCenter.removeMsgListener(id1);
    // };
  }, []);

  //布局类型 分为有图片和没有图片两种
  function listLayout() {
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
  }

  //列表数据
  function listData() {
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    return dataProvider.cloneWithRows(activityList);
  }

  //不同类型渲染方式
  function listRowRender(type: any, data: EventDetail) {
    return <ActivityItem data={data}></ActivityItem>;
  }

  //获取数据
  const loadList = async () => {
    try {
      const res = await ActivityCenter.getEvents();
      setTotal(ActivityCenter.getTotal());
      setHasMore(ActivityCenter.getHasMore());
      setActivityList(ActivityCenter.getList());
    } catch (e) {
      WToast.show({data: '获取活动数据出错' + e});
    }
  };

  //下拉加载更多
  function loadMore() {
    console.log('进来loadMore了', hasMore);
    if (hasMore) {
      //拉活动列表
      console.log('homepage~~~~loadMore');
      loadList();
    } else {
      //   MsgCenter.sendMsg('showToast', {msg: 'no more events'});
    }
  }

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
