import { Navigation } from 'react-native-navigation';

import cmHome from './screens/cmHome';
import SboxLoading from './screens/SboxLoading';
import SboxNotification from './SweetfulBox/Components/SboxNotification/SboxNotification';
import SboxHome from './SweetfulBox/Config/Screens';
import CmLoading from './screens/CmLoading';
import CmEat from './CmEat/Components/Router';
import CmLogin from './screens/CmLogin';
import Notification from './screens/Notification';
import AdView from './App/Components/General/AdView';
import CmAdvertisement from './App/Components/CmAdvertisement/CmAdvertisement';

export function registerScreens() {
  Navigation.registerComponent('cmHome', () => cmHome);
  Navigation.registerComponent('SboxHome', () => SboxHome);
  Navigation.registerComponent('SboxLoading', () => SboxLoading);
  Navigation.registerComponent('SboxNotification', () => SboxNotification);

  Navigation.registerComponent('CmLoading', () => CmLoading);
  Navigation.registerComponent('CmEat', () => CmEat);
  Navigation.registerComponent('CmLogin', () => CmLogin);
  Navigation.registerComponent('Notification', () => Notification);
  Navigation.registerComponent('AdView', () => AdView);
  Navigation.registerComponent('CmAdvertisement', () => CmAdvertisement);
}
