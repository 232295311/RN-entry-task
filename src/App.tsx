import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppNavigators from './navigation/AppNavigators';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaView} from 'react-native';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  return (
    <RootSiblingParent>
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <AppNavigators />
      </SafeAreaView>
    </RootSiblingParent>
  );
}
