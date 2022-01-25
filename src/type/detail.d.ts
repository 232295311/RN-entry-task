interface CommentDetail {
  id: number;
  userId: number;
  eventId: number;
  create_time: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: CreatorInfo;
}
interface Participants {
  avatar: string;
  createdAt: string;
  email: string;
  id: number;
  password: string; //md5编码的？
  salt: string;
  updatedAt: string;
  username: string;
  participation: ParticipationDetail;
}
interface ParticipationDetail {
  id: number;
  userId: number;
  eventId: number;
  createdAt: string;
  updatedAt: string;
}
interface LikesUser {
  // detailPage中likes的用户信息
  id: number;
  username: string;
  avatar: string;
}
// --------------------------------------------------------
interface GetEventDetailReq {
  id: number;
}
interface GetEventDetailResp {
  event: EventDetail;
}

interface GetEventDetailCommentsReq {
  id: number;
  offset?: number;
  limit?: number;
}
interface GetEventDetailCommentsResp {
  comments: CommentDetail[];
}

interface GetEventDetailParticipantsReq {
  id: number;
}

interface GetEventDetailParticipantsResp {
  users: Participants[];
}

interface GetEventDetailLikeReq {
  id: number;
}
interface GetEventDetailLikeResp {
  hasMore: boolean;
  users: LikesUser[];
}

interface PostCommentReq {
  id: number;
  comment: string;
}
// interface PostCommentResp {
//   comment: CommentDetail; //Comment message
// }
