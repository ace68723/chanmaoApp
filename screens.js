import { Navigation } from 'react-native-navigation';
import cmHome from './screens/cmHome';
import CmLoading from './screens/CmLoading';
import CmLogin from './screens/CmLogin';
import CmBindPhone from './App/Components/BindPhone/BindPhone';
import CmAdvertisement from './App/Components/CmAdvertisement/CmAdvertisement';
import Notification from './screens/Notification';
import AdView from './App/Components/General/AdView';
import Loading from './App/Components/General/Loading';

import SboxHome from './SweetfulBox/Config/Screens';
import SboxLoading from './screens/SboxLoading';
import SboxNotification from './SweetfulBox/Components/SboxNotification/SboxNotification';
import CmPasswordReset from './App/Components/Login/ResetPassword';

import CmEat from './CmEat/Config/Screens';




export function registerScreens() {
  Navigation.registerComponent('cmHome', () => cmHome);
  Navigation.registerComponent('CmLoading', () => CmLoading);
  Navigation.registerComponent('CmLogin', () => CmLogin);
  Navigation.registerComponent('CmBindPhone', () => CmBindPhone);
  Navigation.registerComponent('AdView', () => AdView);
  Navigation.registerComponent('Notification', () => Notification);
  Navigation.registerComponent('CmAdvertisement', () => CmAdvertisement);
  Navigation.registerComponent('Loading', () => Loading);

  Navigation.registerComponent('SboxHome', () => SboxHome);
  Navigation.registerComponent('SboxLoading', () => SboxLoading);
  Navigation.registerComponent('SboxNotification', () => SboxNotification);

  Navigation.registerComponent('CmEat', () => CmEat);
  Navigation.registerComponent('CmPasswordReset', () => CmPasswordReset);

}
