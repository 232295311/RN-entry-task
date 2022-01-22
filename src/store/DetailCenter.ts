/**
 * 存储DetailPage中展示的具体信息，包括detail、participants、comments，并提供set和get接口
 *
 * 可做出 初始化detail页面 发出评论 点击参加和取消参加 点击喜欢和取消爱心 等异步操作
 *
 */

import moment from 'moment';
import * as Activity from '../service/activity';
import * as DetailServices from '../service/detail';

class DetailCenter {
  private detail: EventDetail | {} = {};
  private participants: Participants[] = [];
  private comments: CommentDetail[] = [];

  //获取detail、participants、comments，点击进入detail页面时调用
  async initDetailPage(id: number) {
    const [resDetail, resParticipants, resComments] = await Promise.all([
      DetailServices.getEventDetail({id: id}),
      DetailServices.getEventDetailParticipants({id: id}),
      DetailServices.getEventDetailComments({id: id}),
    ]);
    if (resDetail && resParticipants && resComments) {
      this.setDetail(resDetail.event);
      this.setParticipants(resParticipants.users);
      this.setComments(resComments.comments);
      return true;
    }
    return false;
  }

  setDetail(params: EventDetail) {
    this.detail = params;
  }
  getDetail() {
    return this.detail;
  }
  setParticipants(params: Participants[]) {
    this.participants = params;
  }
  getParticipants() {
    return this.participants;
  }
  setComments(params: CommentDetail[]) {
    this.comments = params;
  }
  getComments() {
    return this.comments;
  }
}

export default new DetailCenter();
