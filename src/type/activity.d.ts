interface EventDetail {
  begin_time: string;
  channel: ChannelDetail;
  channel_id: number;
  create_time: string;
  createdAt: string;
  creator: CreatorInfo;
  creator_id: number;
  description: string;
  end_time: string;
  goings_count: number;
  id: number;
  images?: string[];
  likes_count: number;
  location: string;
  location_detail: string;
  me_going: boolean;
  me_likes: boolean;
  name: string;
  update_time: string;
  updatedAt: string;
}

interface ChannelDetail {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}
interface CreatorInfo {
  avatar: string;
  createdAt: string;
  email: string;
  id: number;
  password: string; //md5编码的？
  salt: string;
  updatedAt: string;
  username: string;
}
// ------------------------------------------------------------------------
interface GetEventsReq {
  after?: number;
  before?: number;
  channels?: number;
  offset?: number; //页码
  limit?: number; //每页个数
}
interface GetEventsResp {
  events: EventDetail[];
  hasMore: boolean;
  error?: string;
}

interface JoinEventReq {
  id: number;
}
interface JoinEventResp {
  error?: string;
}

interface QuitEventReq {
  id: number;
}
interface QuitEventResp {
  error?: string;
}

interface LikeEventReq {
  id: number;
}
interface LikeEventResp {
  error?: string;
}

interface DisLikeEventReq {
  id: number;
}
interface DisLikeEventResp {
  error?: string;
}
