import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import {imgAssets} from '../../config/ImgAsset';
import I18n from '../../utils/I18n';
import {scaleSize, setSpText2} from '../../utils/screen';
import UserCenter from '../../store/UserCenter';
// import SafeAreaViewPlus from 'react-native-safe-area-plus';

//邮件输入框元素
let emailInput: any = null;
//密码输入框元素
let passwordInput: any = null;

export default (props: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailStyle, setEmailStyle] = useState<any>(styles.inputItem);
  const [passwordStyle, setPasswordStyle] = useState<any>(styles.inputItem);

  //绑定邮件元素
  function bindEmail(el: any) {
    emailInput = el;
  }

  //绑定密码元素
  function bindPassword(el: any) {
    passwordInput = el;
  }

  //用户输入email
  function emailChange(value: string) {
    setEmail(value);
  }

  //用户输入密码
  function passwordChange(value: string) {
    setPassword(value);
  }

  //焦点进入email
  function emailFocus() {
    setEmailStyle(styles.inputItem);
  }

  //焦点离开email
  function emailBlur() {
    setEmailStyle(styles.inputItemFocus);
  }

  //焦点进入password
  function passwordFocus() {
    setPasswordStyle(styles.inputItem);
  }

  //焦点离开password
  function passwordBlur() {
    setPasswordStyle(styles.inputItemFocus);
  }

  //email和密码检查
  function checkSignIn() {
    if (email === '') {
      //   MsgCenter.sendMsg('showToast', {
      //     msg: '请输入邮箱',
      //   });
      setTimeout(() => {
        emailInput.focus();
      }, 2000);
      return false;
    }
    if (password === '') {
      //   MsgCenter.sendMsg('showToast', {
      //     msg: '请输入密码',
      //   });
      setTimeout(() => {
        passwordInput.focus();
      }, 2000);
      return false;
    }
    console.log('登陆前兆');
    return true;
  }

  //点击登录
  function signIn() {
    if (checkSignIn()) {
      UserCenter.login(email, password);
    }
  }

  return (
    <SafeAreaView style={{
        // backgroundColor: 'red'
    }}>
      <ImageBackground style={styles.container} source={imgAssets.loginBg}>
        <KeyboardAvoidingView
          style={styles.header}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          enabled
          keyboardVerticalOffset={100}>
          <ScrollView style={styles.container}>
            <View style={styles.desc}>
              <Text style={styles.descText}>
                {I18n.t('find_the_most_loved_activities')}
              </Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{I18n.t('black_cat')}</Text>
            </View>
            <View style={styles.logoPanel}>
              <ImageBackground
                style={styles.cat}
                source={imgAssets.loginCat}></ImageBackground>
            </View>
            <View style={styles.layoutTop}></View>
            <View style={styles.inputPanel}>
              <View style={emailStyle}>
                <Image style={styles.loginUser} source={imgAssets.loginUser} />
                <TextInput
                  style={styles.textInput}
                  placeholder={I18n.t('email')}
                  placeholderTextColor="#AC8EC9"
                  value={email}
                  maxLength={30}
                  ref={bindEmail}
                  onChangeText={emailChange}
                  onBlur={emailFocus}
                  onFocus={emailBlur}
                />
              </View>
              <View style={passwordStyle}>
                <Image
                  style={styles.loginPassword}
                  source={imgAssets.loginPassword}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={I18n.t('password')}
                  placeholderTextColor="#AC8EC9"
                  value={password}
                  maxLength={30}
                  ref={bindPassword}
                  onChangeText={passwordChange}
                  onBlur={passwordFocus}
                  onFocus={passwordBlur}
                  secureTextEntry
                />
              </View>
            </View>
            <View style={styles.layoutBot}></View>
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableHighlight
          style={styles.body}
          underlayColor="#E5FF9F"
          onPress={signIn}>
          <Text style={{fontSize: setSpText2(16)}}>{I18n.t('sign_in')}</Text>
        </TouchableHighlight>
      </ImageBackground>
    </SafeAreaView>
  );
};

//定义样式
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  header: {
    flex: scaleSize(507),
    backgroundColor: '#8560A9B3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: scaleSize(65),
    backgroundColor: '#D5EF7F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    height: scaleSize(90),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  descText: {
    color: '#D5EF7F',
    fontSize: setSpText2(16),
    fontWeight: 'bold',
  },
  title: {
    height: scaleSize(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#D5EF7F',
    fontSize: setSpText2(24),
    fontWeight: 'bold',
  },
  logoPanel: {
    height: scaleSize(110),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cat: {
    height: scaleSize(64),
    width: scaleSize(64),
  },
  layoutTop: {
    height: scaleSize(90),
  },
  inputPanel: {
    height: scaleSize(140),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  inputItem: {
    height: scaleSize(40),
    width: scaleSize(240),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: scaleSize(40),
    borderColor: '#D3C1E5',
    borderWidth: scaleSize(1),
  },
  inputItemFocus: {
    height: scaleSize(40),
    width: scaleSize(240),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: scaleSize(40),
    borderColor: '#D3C1E5',
    borderWidth: scaleSize(1),
    backgroundColor: '#FFFFFF33',
  },
  textInput: {
    height: scaleSize(40),
    width: scaleSize(180),
    color: '#453257',
    fontWeight: 'bold',
  },
  loginUser: {
    height: scaleSize(13.3),
    width: scaleSize(13.3),
    marginHorizontal: scaleSize(13),
  },
  loginPassword: {
    height: scaleSize(14.7),
    width: scaleSize(8),
    marginHorizontal: scaleSize(15.3),
  },
  layoutBot: {
    height: scaleSize(60),
  },
});
