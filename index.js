/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Provider as ReduxProvider} from 'react-redux';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
