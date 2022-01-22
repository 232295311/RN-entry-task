import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';
import {WToast} from 'react-native-smart-tip';
import AsyncStorage from '../../utils/AsyncStorage';
import NavigationUtil from '../../navigation/NavigationUtil';
export default (props: any) => {
  const show = () => {
    AsyncStorage.clearItem();
    WToast.show({data: '退出登陆'});
    NavigationUtil.resetToHomePage;
  };
  const change = () => {
    WToast.show({data: '更改成功，请点击退出登陆返回登陆页面'});
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
