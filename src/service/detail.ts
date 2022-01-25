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

//获取活动comments信息 这里返回值应该要有一个hasMore的 但是它没有，我们就当它是返回全量来用吧
const getEventDetailComments = async (
  params: GetEventDetailCommentsReq,
): Promise<GetEventDetailCommentsResp> => {
  const data = {
    ...params,
    offset: params.offset || 0, //页码
    limit: params.limit || 25,
  };
  const res: any = await get(`events/${params.id}/comments`)();
  return res;
};
//用户发送评论，comments信息
const postComment = async (params: PostCommentReq): Promise<CommentDetail> => {
  const data = {
    ...params,
  };
  const res: any = await post(`events/${params.id}/comments`)(data)();
  return res;
};

//获取活动participants信息
const getEventDetailParticipants = async (
  params: GetEventDetailParticipantsReq,
): Promise<GetEventDetailParticipantsResp> => {
  const res: any = await get(`events/${params.id}/participants`)();
  return res;
};

//获取活动likes信息 这里返回值不应该有一个hasMore的 但是它有？
const getEventDetailLikes = async (
  params: GetEventDetailLikeReq,
): Promise<GetEventDetailLikeResp> => {
  const res: any = await get(`events/${params.id}/likes`)();
  return res;
};

export {
  getEventDetail,
  getEventDetailComments,
  getEventDetailParticipants,
  getEventDetailLikes,
  postComment,
};
