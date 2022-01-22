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
// --------------------------------------------------------
interface GetEventDetailReq {
  id: number;
}
interface GetEventDetailResp {
  event: EventDetail;
}

interface GetEventDetailCommentsReq {
  id: number;
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
