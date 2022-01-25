import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {imgAssets} from '../../../config/ImgAsset';
import {scaleSize} from '../../../utils/screen';
export default function Empty() {
  return (
    <View style={styles.empty}>
      <Image style={styles.pic} source={imgAssets.empty} />
      <Text style={styles.desc}>No activity found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
