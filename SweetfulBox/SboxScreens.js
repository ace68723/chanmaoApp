import { Navigation } from 'react-native-navigation';

import SboxAddressList from './Components/SboxAddressList/SboxAddressList';
import SboxHome from './Components/SboxHome/SboxHome';
import SboxHistory from './Components/SboxHistory/SboxHistory';
import SboxSetting from './Components/SboxSetting/SboxSetting';
import SboxService from './Components/SboxSetting/SboxService/SboxService';



// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('Sbox.SboxAddressList', () => SboxAddressList);
  Navigation.registerComponent('Sbox.SboxHome', () => SboxHome);
  Navigation.registerComponent('Sbox.SboxSetting', () => SboxSetting);
  Navigation.registerComponent('Sbox.SboxService', () => SboxService);
}
