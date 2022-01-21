import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../../navigation/NavigationUtil';
import UserCenter from '../../store/UserCenter';

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
    }, 200);
  };

  return (
    <View style={styles.container}>
      <Text>欢迎页面</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
  },
});
