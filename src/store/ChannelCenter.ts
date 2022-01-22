import {getChannels} from '../service/activity';
/**
 * 存储搜索组件中展示的渠道列表，并提供getList和setList等方法
 * 可做出 获取channel 异步操作
 * 可通过渠道id获取渠道名称，可
 */

class ChannelCenter {
  //  渠道列表
  private channelList: ChannelDetail[] = [];

  //获取活动信息 并且存储进属性中
  async getChannels() {
    const res = await getChannels();
    if (res.channels?.length! > 0) {
      this.setList(res.channels || []);
      return true;
    }
    return false;
  }

  //获取列表
  getList() {
    return this.channelList;
  }

  //设置列表
  setList(list: ChannelDetail[]) {
    this.channelList = list;
  }

  //获取渠道名称
  getChannelName(id: number) {
    const foundItem = this.channelList.find(item => {
      return item.id === id;
    });
    return foundItem ? foundItem.name : '-';
  }
}
export default new ChannelCenter();
