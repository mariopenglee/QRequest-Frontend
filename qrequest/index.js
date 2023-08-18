/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { registerRootComponent } from 'expo';

if (Platform.OS == "android") {
    registerRootComponent(App);
}

AppRegistry.registerComponent(appName, () => App);
