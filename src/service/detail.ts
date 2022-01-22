/**
 * DetailPage接口
 */

import {post, get, del} from './request';

//获取活动Detail信息
const getEventDetail = async (
  params: GetEventDetailReq,
): Promise<GetEventDetailResp> => {
  const res: any = await get(`events/${params.id}`)();
  return res;
};

//获取活动comments信息
const getEventDetailComments = async (
  params: GetEventDetailCommentsReq,
): Promise<GetEventDetailCommentsResp> => {
  const res: any = await get(`events/${params.id}/comments`)();
  return res;
};

//获取活动participants信息
const getEventDetailParticipants = async (
  params: GetEventDetailParticipantsReq,
): Promise<GetEventDetailParticipantsResp> => {
  const res: any = await get(`events/${params.id}/participants`)();
  return res;
};

export {getEventDetail, getEventDetailComments, getEventDetailParticipants};
