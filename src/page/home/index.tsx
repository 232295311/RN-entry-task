import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';
import CommonHeader from '../../commonComponent/CommonHeader';
import Drawer from 'react-native-drawer';
import SearchResult from './component/SearchResult';
import List from './component/List';
import Search from './component/Search';

export default (props: any) => {
  useEffect(() => {}, []);

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  return (
    // <SafeAreaView>
    <Drawer
      type={'displace'}
      content={<Search setOpenSearch={setOpenSearch} />} //抽屉内的组件
      open={openSearch}
      openDrawerOffset={100}
      onClose={() => {
        setOpenSearch(false);
      }}>
      <CommonHeader
        pageType="HomePage"
        setOpenSearch={setOpenSearch}></CommonHeader>

      <SearchResult />
      <List />
    </Drawer>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
