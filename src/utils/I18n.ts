import AsyncStorage from './AsyncStorage';
import en_Data from '../config/en.json';
import zh_cn_Data from '../config/zh-cn.json';

// const en_Object = JSON.stringify(en_Data);
// const zh_cn_Object = JSON.stringify(zh_cn_Data);

// console.log(typeof en_Data);
// console.log(en_Data);

class I18n {
  private curLang = 'en';

  init() {
    this.getDefaultLang();
  }

  //设置默认语言
  setDefaultLang(tmpLang: string) {
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
    return '';
  }
}
export default new I18n();
