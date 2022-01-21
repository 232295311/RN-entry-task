import {post} from './request';
/**
 * LoginPage接口
 */
export const register = async (
  email: string,
  password: string,
): Promise<RegisterResp> => {
  //   const data = new FormData();
  //   data.append('email', email);
  //   data.append('username', email);
  //   data.append('password', password);
  //   data.append('avatar',)
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
  console.log('longin~~~~~~data', data);
  const res: any = await post('auth/token')(data)();
  console.log('longin~~~~~~res', res);
  return res;
};
