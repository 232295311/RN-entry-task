import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';
// import NavigationBar from 'react-native-navbar-plus';
import {WToast} from 'react-native-smart-tip';
import CommonHeader from '../../commonComponent/CommonHeader';
import SideMenu from 'react-native-side-menu';
import SearchResult from './component/SearchResult';
import List from './component/List';

export default (props: any) => {
  useEffect(() => {}, []);
  const menu = <Text style={{marginTop: 22}}>aaa</Text>;
  return (
    // <SafeAreaView>
    <SideMenu
      menu={menu} //抽屉内的组件
      isOpen={false}>
      <CommonHeader pageType="HomePage"></CommonHeader>

      <SearchResult />
      <List />
    </SideMenu>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
