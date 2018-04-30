/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { PushNotificationIOS } from 'react-native';
import { DatabaseInit } from './App/Modules/Database';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import codePush from "react-native-code-push";

codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE});

DatabaseInit();
registerScreens();
PushNotificationIOS.requestPermissions();
PushNotificationIOS.addEventListener('register', (deviceToken) => {
    console.log(deviceToken);
    // realm.write(() => {
    //     realm.create('AppUserInfo', { param: 'deviceToken', value: deviceToken }, true);
    // });
});
PushNotificationIOS.addEventListener('registrationError', (error) => {
    console.log('here');
    console.log(error);
});
PushNotificationIOS.addEventListener('notification', (notification) => {
    console.log(notification);

    console.log('get data', notification.getData());
});

Navigation.startSingleScreenApp({
  screen: {
    screen: 'cmHome',
    navigatorStyle: {navBarHidden: true},
    navigatorButtons: {},
  },
})
// cmHome SboxCheckout SboxCategory SboxAddCard SboxPay SboxAddressList SboxAddAddressInfo SboxCart
