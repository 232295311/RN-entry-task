import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native';
import {scaleSize, setSpText2} from '../../../utils/screen';
import {imgAssets} from '../../../config/ImgAsset';
export default (props: any) => {
  const data: EventDetail = props.data;
  return (
    <>
      {data && (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleLeft}></Text>
            <Text style={styles.titleText}>{'Where'}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.location}>{data.location}</Text>
            <Text style={styles.locationDetail}>{data.location_detail}</Text>
            <Image style={styles.gMap} source={imgAssets.gMap}></Image>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: scaleSize(16),
  },
  title: {
    height: scaleSize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleLeft: {
    backgroundColor: '#8560A9',
    height: '100%',
    width: scaleSize(4),
    borderRadius: scaleSize(2),
    overflow: 'hidden',
  },
  titleText: {
    fontSize: setSpText2(16),
    fontWeight: 'bold',
    color: '#8560A9',
    marginLeft: scaleSize(4),
  },

  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: scaleSize(16),
  },
  location: {
    fontSize: setSpText2(14),
    color: '#67616D',
    fontWeight: 'bold',
  },
  locationDetail: {
    fontSize: setSpText2(14),
    color: '#67616D',
    marginTop: scaleSize(6),
  },
  gMap: {
    width: '100%',
    height: scaleSize(88),
    marginTop: scaleSize(8),
    // height: '100%',
  },
});
