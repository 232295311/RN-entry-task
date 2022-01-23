import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleSize, setSpText2} from '../../../utils/screen';
interface ScrollTabProps {
  type: 'Details' | 'Participants' | 'Comments';
}
export default (props: ScrollTabProps) => {
  const activeType = props.type;
  const renderDetail = (type: string) => {
    return (
      <>
        <MaterialCommunityIcons
          name={type === 'Details' ? 'alert-circle' : 'alert-circle-outline'}
          size={20}
          style={type === 'Details' ? styles.lightIcon : styles.commonIcon}
        />
        <Text style={type === 'Details' ? styles.lightText : styles.commonText}>
          Details
        </Text>
      </>
    );
  };
  const renderParticipants = (type: string) => {
    return (
      <>
        <Ionicons
          name={
            type === 'Participants' ? 'md-people-sharp' : 'md-people-outline'
          }
          size={20}
          style={type === 'Participants' ? styles.lightIcon : styles.commonIcon}
        />
        <Text
          style={
            type === 'Participants' ? styles.lightText : styles.commonText
          }>
          Participants
        </Text>
      </>
    );
  };
  const renderComments = (type: string) => {
    return (
      <>
        <Ionicons
          name={
            type === 'Comments'
              ? 'ios-chatbubbles-sharp'
              : 'ios-chatbubbles-outline'
          }
          size={20}
          style={type === 'Comments' ? styles.lightIcon : styles.commonIcon}
        />
        <Text
          style={type === 'Comments' ? styles.lightText : styles.commonText}>
          Comments
        </Text>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconItem}>{renderDetail(activeType)}</View>
      <View style={styles.iconItem}>{renderParticipants(activeType)}</View>
      <View style={styles.iconItemLast}>{renderComments(activeType)}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(16),
  },
  lightIcon: {
    color: '#AECB4F',
  },
  lightText: {
    color: '#AECB4F',
    marginLeft: scaleSize(6),
    fontSize: setSpText2(12),
  },
  commonIcon: {
    color: '#BABABA',
  },
  commonText: {
    color: '#8C8C8C',
    marginLeft: scaleSize(6),
    fontSize: setSpText2(12),
  },
  iconItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(16),
    borderRightWidth: 2,
    borderRightColor: '#E8E8E8',
  },
  iconItemLast: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(16),
  },
});

