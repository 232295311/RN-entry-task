/**
 * HomePage接口
 */
import {post, get} from './request';

//获取活动信息
const getEvents = async (params: GetEventsReq): Promise<GetEventsResp> => {
  const data = {
    ...params,
    offset: params.offset || 0, //页码
    limit: params.limit || 25,
  };
  if (data.after === 0) {
    delete data.after;
  }
  if (data.before === 0) {
    delete data.before;
  }
  if (data.channels === 0) {
    delete data.channels;
  }
  const res: any = await get('events')(data);
  return res;
};

//获取渠道信息
const getChannels = async (): Promise<GetChannelsResp> => {
  const res: any = await get('channels')();
  return res;
};

//用户点击参加活动
const joinEvent = async (params: JoinEventReq): Promise<JoinEventResp> => {
  const res: any = await post('events/' + params.id + '/participants')({})();
  return res;
};

//用户点击不参加活动
const quitEvent = async (params: QuitEventReq): Promise<QuitEventResp> => {
  const res: any = await post('events/' + params.id + '/participants')({})();
  return res;
};

//用户点击爱心，喜欢活动
const likeEvent = async (params: LikeEventReq): Promise<LikeEventResp> => {
  const res: any = await post('events/' + params.id + '/likes')({})();
  return res;
};

//用户取消爱心，不喜欢活动
const disLikeEvent = async (
  params: DisLikeEventReq,
): Promise<DisLikeEventResp> => {
  const res: any = await post('events/' + params.id + '/likes')({})();
  return res;
};

export {getEvents, getChannels, joinEvent, quitEvent, likeEvent, disLikeEvent};
