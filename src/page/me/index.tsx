import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
export default (props: any) => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>我的页面</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 100,
  },
});