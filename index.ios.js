/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { DatabaseInit } from './App/Modules/Database';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import codePush from "react-native-code-push";

// codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE});

DatabaseInit();
registerScreens();
Navigation.startSingleScreenApp({
  screen: {
    screen: 'cmHome', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {},
  },
})
// cmHome SboxCheckout SboxCategory SboxAddCard SboxPay SboxAddressList SboxAddAddressInfo SboxCart
