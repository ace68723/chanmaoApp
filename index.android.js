import { DatabaseInit } from './App/Modules/Database';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
DatabaseInit();
registerScreens();
Navigation.startSingleScreenApp({
  screen: {
    // screen: 'cmHome', CmEat CmLogin// unique ID registered with Navigation.registerScreen
    screen: 'cmHome',
    navigatorStyle: {navBarHidden: true}, 
    navigatorButtons: {}, 

  },
  animated: true,
  animationType: 'fade',
})
