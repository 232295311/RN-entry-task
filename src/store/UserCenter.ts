import AsyncStorage from '../utils/AsyncStorage';
import {login, register} from '../service/login';
/**
 * 存储用户个人信息，并暴露setUserInfo和getUserInfo等方法。
 * 存储用户token，暴露setUserToken和getUserToken等方法。
 * 可做出 注册、登陆、获取登陆态 等异步操作
 */

class UserCenter {
  private userInfo: UserInfo = {
    id: 0,
    username: '',
    avatar: '',
    email: '',
    likes_count: 0,
    past_count: 0,
    goings_count: 0,
  };
  private token: string = '';

  setUserInfo(data: UserInfo, needCache?: boolean) {
    if (data) {
      this.userInfo.id = data.id;
      this.userInfo.username = data.username;
      this.userInfo.email = data.email;
      this.userInfo.avatar = data.avatar;
      // 如果需要存储到asyncStorage中
      if (needCache) {
        AsyncStorage.setItem('UserInfo', JSON.stringify(this.userInfo));
      }
    }
  }

  getUserInfo() {
    return this.userInfo;
  }

  setUserToken(token: string, needCache?: boolean) {
    this.token = token;
    if (needCache) {
      AsyncStorage.setItem('UserToken', token);
    }
  }

  getUserToken() {
    console.log('getUserToken', this.token);
    return this.token;
  }

  /**
   * 注册
   * @param email
   * @param password
   */
  async register(email: string, password: string) {
    const res = await register(email, password);
    if (!res.error) {
      this.setUserInfo(
        {
          id: res.userId,
          email: email,
          username: email,
          avatar: 'https://reactnative.dev/img/tiny_logo.png',
        },
        true,
      );
      this.setUserToken(res.token, true);
    }
  }

  //用户登录
  async login(email: string, password: string) {
    const res = await login(email, password);
    if (!res.error) {
      this.setUserInfo(res.user, true);
      this.setUserToken(res.token, true);
    }
  }

  //检查登录态
  async checkLogin() {
    const tmpUserInfo: any = await AsyncStorage.getItem('UserInfo');
    const tmpToken: any = await AsyncStorage.getItem('UserToken');
    console.log('tmpUserInfo', tmpUserInfo);
    console.log('tmpToken', tmpToken);
    if (tmpToken && tmpToken != '') {
      this.setUserToken(tmpToken);
      this.setUserInfo(JSON.parse(tmpUserInfo));
      return true;
    }
    return false;
  }
}

export default new UserCenter();
