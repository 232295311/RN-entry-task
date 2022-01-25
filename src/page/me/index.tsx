import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';
import Toast from 'react-native-root-toast';
import AsyncStorage from '../../utils/AsyncStorage';
import NavigationUtil from '../../navigation/NavigationUtil';
import I18n from '../../utils/I18n';
export default (props: any) => {
  const show = () => {
    AsyncStorage.clearItem();
    Toast.show('退出登陆');
    NavigationUtil.resetToLoginPage({});
  };
  const change = async () => {
    await I18n.changeLang();
    Toast.show('更改成功，请点击退出登陆返回登陆页面');
  };
  return (
    <SafeAreaView style={styles.root}>
      <Button
        title={'退出登陆'}
        onPress={() => {
          show();
        }}></Button>
      <Button
        title={'更改登陆页语言'}
        onPress={() => {
          change();
        }}></Button>
      <Text>我的页面</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 100,
  },
});
