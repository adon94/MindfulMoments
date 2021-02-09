/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

import { name as appName } from './app.json';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('latestMeditation', jsonValue);
  } catch (e) {
    // saving error
  }
};

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  storeData(remoteMessage);
});

messaging()
  .subscribeToTopic('meditations')
  .then(() => console.log('Subscribed to topic!'));

AppRegistry.registerComponent(appName, () => App);
