import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import NavigationUtil from '../navigation/NavigationUtil';
import {imgAssets} from '../config/ImgAsset';
import UserCenter from '../store/UserCenter';
import {scaleSize,} from '../utils/screen';
interface HeaderProps {
  pageType: string; //当前header所在页面类型
  setOpenSearch?(checked: boolean): void;
}
export default function CommonHeader(props: HeaderProps) {
  //渲染主界面按钮
  const renderHome = () => {
    if (props.pageType === 'MyPage' || props.pageType === 'DetailPage') {
      return (
        <View style={styles.search} onTouchEnd={gotoHome}>
          <Image style={styles.homeIcon} source={imgAssets.homeSearch} />
        </View>
      );
    } else {
      return (
        <View style={styles.search} onTouchEnd={touchSearch}>
          <Image style={styles.searchIcon} source={imgAssets.headerSearch} />
        </View>
      );
    }
  };

  //跳转查询界面
  const touchSearch = () => {
    // console.log('touchSearch', props.openSearch);
    props.setOpenSearch && props.setOpenSearch(true);
  };

  //跳转我的界面
  const gotoMe = () => {
    NavigationUtil.goPage({}, 'MyPage');
  };

  //跳转主界面
  const gotoHome = () => {
    NavigationUtil.goPage({}, 'HomePage');
  };

  return (
    <View style={styles.header}>
      {renderHome()}
      <View style={styles.cat}>
        <Image style={styles.catIcon} source={imgAssets.headerCat} />
      </View>
      <View style={styles.user} onTouchEnd={gotoMe}>
        <Image
          style={styles.userIcon}
          source={{uri: UserCenter.getUserInfo().avatar}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: scaleSize(40),
    width: '100%',
    backgroundColor: '#8560A9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(10),
  },
  search: {
    height: scaleSize(40),
    width: scaleSize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    height: scaleSize(18),
    width: scaleSize(18),
  },
  homeIcon: {
    height: scaleSize(25),
    width: scaleSize(25),
  },
  cat: {
    height: scaleSize(40),
    width: scaleSize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  catIcon: {
    height: scaleSize(24),
    width: scaleSize(21),
  },
  user: {
    height: scaleSize(40),
    width: scaleSize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    height: scaleSize(24),
    width: scaleSize(24),
    borderRadius: 20,
  },
});
