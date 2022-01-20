import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../../navigation/navigation_utils';
import {getBoarding} from '../../utils/BoardingUtil';

export default function (props: any) {
  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    doLaunch();
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  const doLaunch = async () => {
    const boarding = await getBoarding();
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
