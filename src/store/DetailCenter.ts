/**
 * 存储DetailPage中展示的具体信息，包括detail、participants、comments，并提供set和get接口
 *
 * 可做出 初始化detail页面 发出评论 点击参加和取消参加 点击喜欢和取消爱心 等异步操作
 *
 */

import * as DetailServices from '../service/detail';

class DetailCenter {
  private detail: EventDetail | null = null;
  private participants: Participants[] = [];
  private likes: LikesUser[] = [];
  private comments: CommentDetail[] = [];

  //获取detail、participants、comments，点击进入detail页面时调用
  async initDetailPage(id: number) {
    const [resDetail, resParticipants, resLikes, resComments] =
      await Promise.all([
        DetailServices.getEventDetail({id: id}),
        DetailServices.getEventDetailParticipants({id: id}),
        DetailServices.getEventDetailLikes({id: id}),
        DetailServices.getEventDetailComments({id: id}),
      ]);
    if (resDetail && resParticipants && resComments) {
      this.setDetail(resDetail.event);
      this.setParticipants(resParticipants.users);
      this.setLikes(resLikes.users);
      this.setComments(resComments.comments);
      return true;
    }
    return false;
  }

  //获取participants 更新Participants组件
  async updateParticipants(id: number) {
    const resParticipants = await DetailServices.getEventDetailParticipants({
      id: id,
    });
    if (resParticipants) {
      this.setParticipants(resParticipants.users);
      return true;
    }
    return false;
  }

  //获取participants 更新likes组件
  async updateLikes(id: number) {
    const resLikes = await DetailServices.getEventDetailLikes({
      id: id,
    });
    if (resLikes) {
      this.setLikes(resLikes.users);
      return true;
    }
    return false;
  }

  // 用户评论时调用 发送comments、并同时更新this.Comment以更新Comments组件
  async postComment(id: number, comment: string) {
    const resComments = await DetailServices.postComment({
      id,
      comment,
    });
    if (resComments) {
      this.setComments([...this.getComments(), resComments]);
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
  setLikes(params: LikesUser[]) {
    this.likes = params;
  }
  getLike() {
    return this.likes;
  }
  setComments(params: CommentDetail[]) {
    this.comments = params;
  }
  getComments() {
    return this.comments;
  }
}

export default new DetailCenter();
