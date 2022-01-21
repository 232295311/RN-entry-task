import AsyncStorage from '../utils/AsyncStorage';
import * as Activity from '../service/activity';

/**
 * 存储App内活动信息，
 * 可做出 获取活动，获取channel，喜欢活动，不喜欢活动，参加活动，不参加活动 等异步操作
 */
class ActivityCenter {
  //列表 用于首页展示
  private list: Array<EventDetail> = [];
  //有无更多
  private hasMore = true;
  //列表总量
  private total = 0;
  //当前数量
  private offset = 0;
  //当前渠道 只有搜索的时候会被改变 0的时候将被删除出参数
  private channels = 0;
  //开始时间 只有搜索的时候会被改变 0的时候将被删除出参数
  private after: number | undefined = 0;
  //结束时间 只有搜索的时候会被改变 0的时候将被删除出参数
  private before: number | undefined = 0;

  //获取活动信息 第一次进入主页时调用 loadMore的时候调用
  async getEvents() {
    const params: GetEventsReq = {
      after: this.after,
      before: this.before,
      channels: this.channels,
      offset: this.offset,
      limit: 25,
    };
    const res = await Activity.getEvents(params);
    if (!res.error) {
      this.setList(res.events); //同时会拼接两次的list和更新offset
      this.setHasMore(res.hasMore);
      this.setTotal(res.events.length);
      //   MsgCenter.sendMsg('getEventsSuccess', '');
      return res;
    }
    return false;
  }

  //搜索活动信息 点击搜索后调用
  async searchEvents(params: GetEventsReq) {
    this.channels = params.channels || 0;
    this.after = params.after || 0;
    this.before = params.before || 0;

    //搜索需要重新清空数据
    this.setList([]);
    this.setHasMore(false);
    this.setTotal(0);
    this.setOffset(0);
    await this.getEvents();
  }

  //参与活动
  async joinEvent(params: JoinEventReq) {
    // try {
    const res = await Activity.joinEvent(params);
    if (res === '') {
      // 成功时，返回的res是空
      const item = this.getItemById(params.id);
      if (item) {
        item.goings_count = item.goings_count + 1;
        item.me_going = true;
      }
      return true;
    } else {
      return false;
    }
  }

  //不参与活动
  async quitEvent(params: QuitEventReq) {
    const res = await Activity.quitEvent(params);
    if (res === '') {
      // 成功时，返回的res是空
      const item = this.getItemById(params.id);
      if (item) {
        item.goings_count = item.goings_count - 1;
        item.me_going = false;
      }
      return Promise.resolve(res);
    } else {
      return Promise.reject(new Error(''));
    }
  }

  //参与活动
  async likeEvent(params: LikeEventReq) {
    const res = await Activity.likeEvent(params);
    if (res === '') {
      // 成功时，返回的res是空
      const item = this.getItemById(params.id);
      if (item) {
        item.likes_count = item.likes_count + 1;
        item.me_likes = true;
      }
    }
  }

  //不参与活动
  async disLikeEvent(params: DisLikeEventReq) {
    const res = await Activity.disLikeEvent(params);
    if (res === '') {
      // 成功时，返回的res是空
      const item = this.getItemById(params.id);
      if (item) {
        item.likes_count = item.likes_count - 1;
        item.me_likes = false;
      }
    }
  }

  //根据id在list中找到对应的Item
  getItemById(id: number) {
    let res = null;
    for (let i = 0; i < this.offset; i++) {
      let item = this.list[i];
      if (item.id === id) {
        res = item;
        break;
      }
    }
    return res;
  }

  //获取列表
  getList() {
    return this.list;
  }

  //设置列表
  setList(data: Array<EventDetail>) {
    if (data.length > 0) {
      this.list = this.list.concat(data);
    } else {
      this.list = [];
    }
    this.setOffset(this.list.length);
  }

  //获取有无更多
  getHasMore() {
    return this.hasMore;
  }

  //设置有无更多
  setHasMore(hasMore: boolean) {
    this.hasMore = hasMore;
  }

  //获取总量
  getTotal() {
    return this.total;
  }

  //设置总量
  setTotal(total: number) {
    this.total = total;
  }

  //获取当前数量
  getOffset() {
    return this.offset;
  }

  //设置当前数量
  setOffset(offset: number) {
    this.offset = offset;
  }

  //获取渠道
  getChannels() {
    return this.channels;
  }

  //开始时间
  getAfter() {
    if (this.after === 0) {
      return '-';
    }
    // return DateUtil.formatDM(this.after);
    return this.after;
  }

  //结束时间
  getBefore() {
    if (this.before === 0) {
      return '-';
    }
    // return DateUtil.formatDM(this.before);
    return this.before;
  }
}

export default new ActivityCenter();
