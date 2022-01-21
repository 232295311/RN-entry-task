interface RegisterReq {
  password: string;
  username: string;
  avatar: string;
  email: string;
}

interface RegisterResp {
  token: string;
  userId: number;
  error?: string;
}

interface LoginReq {
  password: string;
  username: string;
  email: string;
}

interface LoginResp {
  token: string;
  user: UserInfo;
  error?: string;
}
