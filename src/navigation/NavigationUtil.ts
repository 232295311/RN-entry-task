import {StackActions} from '@react-navigation/native';

/**
 * 全局导航跳转工具类 by siyuan.chen
 *
 * navigation属性
 * 在你的应用程序中的每个页面都将接收到一个导航属性，其中包含以下内容：
 *
 * navigate - (助手) 链接到其他页面
 * state - 页面当前的状态/路由
 * setParams - (助手) 修改路由的参数
 * goBack - (助手) 关闭当前页面并返回上一页
 * dispatch - 向路由分发一个事件
 */
debugger;
export default class NavigationUtil {
  public static navigation: any | null = null; //进入homePage的时候将被注入this.props.homePage

  /**
   * 跳转到指定页面
   * @param {*} params 要传递的参数
   * @param {*} page 要跳转的页面名
   */
  static goPage(params: any, page: string) {
    const navigation = NavigationUtil.navigation || params.navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null');
      return;
    }
    navigation.navigate(page, {
      ...params,
      navigation: undefined,
    });
  }
  /**
   * 返回上一页
   * @param {*} navigation
   */
  static goBack(navigation: any) {
    navigation.goBack();
  }
  /**
   * 重置到首页
   */
  static resetToHomePage(params: any) {
    /**
     * StackActions 是一个对象，其中包含用于生成特定于基于堆栈的导航器的操作的方法。
     * 它的方法扩展了 CommonActions 中可用的操作。
     * 使用replace将不能返回到上一页，除非它之前路由栈中有内容
     */
    let {navigation} = params;
    if (!navigation) {
      navigation = NavigationUtil.navigation;
    }
    navigation.dispatch(StackActions.replace('HomePage', {}));
  }
  /**
   * 重置到登陆页
   */
  static resetToLoginPage(params?: any) {
    let {navigation} = params;
    if (!navigation) {
      navigation = NavigationUtil.navigation;
    }
    navigation.dispatch(StackActions.replace('LoginPage', {}));
  }
}
