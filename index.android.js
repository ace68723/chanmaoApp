import { DatabaseInit } from './App/Modules/Database';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
DatabaseInit();
registerScreens();
Navigation.startSingleScreenApp({
  screen: {
    // screen: 'cmHome', CmEat CmLogin// unique ID registered with Navigation.registerScreen
    screen: 'SboxNotification',
    navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
})
