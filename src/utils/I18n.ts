import AsyncStorage from './AsyncStorage';
import en_Data from '../config/en.json';
import zh_cn_Data from '../config/zh-cn.json';

class I18n {
  private curLang = 'en';

  init() {
    this.getDefaultLang();
  }

  //设置默认语言
  setDefaultLang(tmpLang: 'zh_cn' | 'en') {
    this.curLang = tmpLang;
    AsyncStorage.setItem('locale', tmpLang);
  }

  //获取默认语言
  async getDefaultLang() {
    const tmpLang: string | null = await AsyncStorage.getItem('locale');
    if (tmpLang) {
      this.curLang = tmpLang;
    }
    return this.curLang;
  }

  // 切换语言 英语和中文间的切换
  async changeLang() {
    const currLang = await this.getDefaultLang();
    if (currLang === 'en') {
      this.setDefaultLang('zh_cn');
    } else {
      this.setDefaultLang('en');
    }
  }

  //根据当前语言翻译
  t(key: string) {
    // const item = ReaderMap[key];
    if (this.curLang === 'zh_cn') {
      // @ts-ignore
      return zh_cn_Data[key];
    } else {
      // @ts-ignore
      return en_Data[key];
    }
  }
}
export default new I18n();
