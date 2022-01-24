import moment from 'moment-timezone';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
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
            <Text style={styles.titleText}>{'When'}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.contentLeft}>
              <View style={styles.contentTitle}>
                <Image
                  source={imgAssets.from}
                  style={styles.contentIcon}></Image>
                <Text style={styles.date}>
                  {moment(data.begin_time).format('DD MMM YYYY')}
                </Text>
              </View>
              <View style={styles.contentTime}>
                <Text style={styles.time}>
                  {moment(data.begin_time).format('HH:MM')}
                </Text>
                <Text style={styles.amOrPm}>
                  {moment(data.begin_time).format('A')}
                </Text>
              </View>
            </View>
            <View style={styles.contentRight}>
              <View style={styles.contentTitle}>
                <Image source={imgAssets.to} style={styles.contentIcon}></Image>
                <Text style={styles.date}>
                  {moment(data.end_time).format('DD MMM YYYY')}
                </Text>
              </View>
              <View style={styles.contentTime}>
                <Text style={styles.time}>
                  {moment(data.begin_time).format('HH:MM')}
                </Text>
                <Text style={styles.amOrPm}>
                  {moment(data.begin_time).format('A')}
                </Text>
              </View>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaleSize(16),
  },
  contentLeft: {
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(20),
    borderRightWidth: scaleSize(2),
    borderRightColor: '#E8E8E8',
  },
  contentRight: {
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(20),
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentIcon: {
    width: scaleSize(16),
    height: scaleSize(13),
  },
  date: {
    fontSize: setSpText2(16),
    color: '#67616D',
    marginLeft: scaleSize(4),
  },
  contentTime: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: scaleSize(6),
  },
  amOrPm: {
    color: '#AECB4F',
    fontSize: setSpText2(10),
    marginLeft: scaleSize(4),
  },
  time: {
    color: '#AECB4F',
    fontSize: setSpText2(32),
    marginLeft: scaleSize(20),
  },
});
