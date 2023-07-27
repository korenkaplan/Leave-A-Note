/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging'
import { Alert } from 'react-native';
// deep linking to app when use click the notification
messaging().setBackgroundMessageHandler(async message =>
    {
        console.log('background message');
console.log(`Background message: ${message}`);
    });




AppRegistry.registerComponent(appName, () => App);
