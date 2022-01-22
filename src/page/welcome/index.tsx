import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import NavigationUtil from '../../navigation/NavigationUtil';
import UserCenter from '../../store/UserCenter';
import {imgAssets} from '../../config/ImgAsset';
import {scaleSize} from '../../utils/screen';

export default function (props: any) {
  let timer: NodeJS.Timeout | null = null;
  // 给NavigationUtil注入
  NavigationUtil.navigation = props.navigation;

  useEffect(() => {
    doLaunch();
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  const doLaunch = async () => {
    const boarding = await UserCenter.checkLogin();
    const {navigation} = props;
    timer = setTimeout(() => {
      if (boarding) {
        NavigationUtil.resetToHomePage({navigation});
      } else {
        NavigationUtil.resetToLoginPage({navigation});
      }
    }, 2000);
  };

  return (
    <ImageBackground style={styles.container} source={imgAssets.loginBg}>
      <Image style={styles.cat} source={imgAssets.loginCat}></Image>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4,
  },
  cat: {
    marginTop: scaleSize(-140),
    height: scaleSize(100),
    width: scaleSize(100),
    opacity: 1,
  },
});
