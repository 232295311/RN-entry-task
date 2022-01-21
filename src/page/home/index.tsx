import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';
// import NavigationBar from 'react-native-navbar-plus';
import SafeAreaViewPlus from 'react-native-safe-area-plus';
import {WToast} from 'react-native-smart-tip';
import CommonHeader from '../../commonComponent/CommonHeader';
export default (props: any) => {
  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <CommonHeader pageType="HomePage"></CommonHeader>
      <Text>主页面</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
