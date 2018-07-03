import { AppRegistry,NativeModules,Platform } from 'react-native';
import App from './App';
if(Platform.OS  == 'android'){
    //add realm
const Realm = require('realm');
const realm = new Realm();
const getDeviceToken = async ()=>{
    try {
      const deviceToken = await NativeModules.RNFirebaseMessagingService.getDeviceToken();
      realm.write(() => {
          realm.create('AppUserInfo', { param: 'deviceToken', value: deviceToken }, true);
      });
    } catch (e) {
  
    } finally {
  
    }
  }
  getDeviceToken()
}

AppRegistry.registerComponent('chanmao', () => App);
