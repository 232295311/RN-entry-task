import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {scaleSize, setSpText2} from '../../../utils/screen';
import {renderDiffNow} from '../../../utils/formatTime';

export default (props: any) => {
  const data: EventDetail = props.data;

  return (
    <>
      {data && (
        <View style={styles.container}>
          <View style={styles.channelName}>
            <Text style={styles.channelNameText}>{data.channel.name}</Text>
          </View>
          <View style={styles.title}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.titleText}>
              {data.name}
            </Text>
          </View>
          <View style={styles.users}>
            <Image style={styles.avatar} source={{uri: data.creator.avatar}} />
            <View style={styles.userInfo}>
              <Text style={styles.nickName}>{data.creator.username}</Text>
              <Text style={styles.publishedTime}>
                {renderDiffNow(data.create_time)}
              </Text>
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
  channelName: {
    height: scaleSize(20),
    width: scaleSize(89),
    borderRadius: 20,
    borderColor: '#D3C1E5',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelNameText: {
    fontSize: setSpText2(12),
    color: '#8560A9',
  },
  title: {
    marginTop: scaleSize(12),
    marginVertical: scaleSize(4),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: setSpText2(20),
    color: '#453257',
    fontWeight: 'bold',
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(24),
  },
  avatar: {
    height: scaleSize(36),
    width: scaleSize(36),
    borderRadius: 18,
  },
  userInfo: {
    flexDirection: 'column',
    marginLeft: scaleSize(12),
  },
  nickName: {
    fontSize: setSpText2(14),
    color: '#67616D',
  },
  publishedTime: {
    marginTop: scaleSize(4),
    fontSize: setSpText2(12),
    color: '#BABABA',
  },
});
