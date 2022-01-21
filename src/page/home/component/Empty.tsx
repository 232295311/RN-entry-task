import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {imgAssets} from '../../../config/ImgAsset';
// import UIAdpt from '../../../libs/ui_adpt';
import {scaleSize} from '../../../utils/screen';
export default function Empty() {
  //样式定义
  const styles = StyleSheet.create({
    empty: {
      height: scaleSize(400),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pic: {
      height: scaleSize(60),
      width: scaleSize(60),
      marginBottom: scaleSize(15),
    },
    desc: {
      fontSize: 14,
      color: '#BABABA',
    },
  });

  return (
    <View style={styles.empty}>
      <Image style={styles.pic} source={imgAssets.empty} />
      <Text style={styles.desc}>No activity found</Text>
    </View>
  );
}
