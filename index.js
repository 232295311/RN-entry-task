/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Beijing'); //东八区时间

AppRegistry.registerComponent(appName, () => App);
