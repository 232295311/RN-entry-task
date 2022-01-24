import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppNavigators from './navigation/AppNavigators';
import {WRootToastApp} from 'react-native-smart-tip';
import {SafeAreaView} from 'react-native';
// import store from './store';

export default function App() {
  /**
   * 将store传递给整个app框架
   */
  return (
    <WRootToastApp>
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <AppNavigators />
      </SafeAreaView>
    </WRootToastApp>
    // <Provider store={}>
    // </Provider>
  );
}
