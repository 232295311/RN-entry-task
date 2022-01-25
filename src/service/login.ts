import {post} from './request';
/**
 * LoginPage接口
 */
export const register = async (
  email: string,
  password: string,
): Promise<RegisterResp> => {
  const data: RegisterReq = {
    email: email,
    username: email,
    password: password,
    avatar: 'https://reactnative.dev/img/tiny_logo.png',
  };
  const res: any = await post('join')(data)();
  return res;
};

export const login = async (
  email: string,
  password: string,
): Promise<LoginResp> => {
  const data: LoginReq = {
    email: email,
    username: email,
    password: password,
  };
  const res: any = await post('auth/token')(data)();
  return res;
};
