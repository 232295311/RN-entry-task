import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';
import {WToast} from 'react-native-smart-tip';
import AsyncStorage from '../../utils/AsyncStorage';
export default (props: any) => {
  const show = () => {
    AsyncStorage.clearItem();
  };
  return (
    <SafeAreaView style={styles.root}>
      <Button
        title={'退出登陆'}
        onPress={() => {
          show();
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
