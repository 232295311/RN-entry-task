import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
export default (props: any) => {
  return <SafeAreaView style={styles.root}></SafeAreaView>;
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
