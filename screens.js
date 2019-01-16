import { Navigation } from 'react-native-navigation';
import cmHome from './screens/cmHome';
import CmLoading from './screens/CmLoading';
import CmLogin from './screens/CmLogin';
import CmBindPhone from './App/Components/BindPhone/BindPhone';
import CmAdvertisement from './App/Components/CmAdvertisement/CmAdvertisement';
import Notification from './screens/Notification';
import AdView from './App/Components/General/AdView';
import Loading from './App/Components/General/Loading';

import CustomerService from './App/Components/CustomerService/index';
import CustomerServiceListView from './App/Components/CustomerService/ListView';
import CustomerServiceContentView from './App/Components/CustomerService/ContentView';

import SboxHome from './SweetfulBox/Config/Screens';
import SboxLoading from './screens/SboxLoading';
import SboxNotification from './SweetfulBox/Components/SboxNotification/SboxNotification';
import LanguagesAndRegions from './App/Components/LanguagesAndRegions';

import CmEat from './CmEat/Config/Screens';

import CmLifeHome from './CmLife/Config/Screens';

import CodePushUpdate from './App/Components/CodePushUpdate/CodePushUpdate';
import IntroPage from './App/Components/startupAnimation/introPage';
export function registerScreens() {
  Navigation.registerComponent('cmHome', () => cmHome);
  Navigation.registerComponent('CmLoading', () => CmLoading);
  Navigation.registerComponent('CmLogin', () => CmLogin);
  Navigation.registerComponent('CmBindPhone', () => CmBindPhone);
  Navigation.registerComponent('AdView', () => AdView);
  Navigation.registerComponent('Notification', () => Notification);
  Navigation.registerComponent('CmAdvertisement', () => CmAdvertisement);
  Navigation.registerComponent('Loading', () => Loading);

  Navigation.registerComponent('CustomerService', () => CustomerService);
  Navigation.registerComponent('CustomerServiceListView', () => CustomerServiceListView);
  Navigation.registerComponent('CustomerServiceContentView', () => CustomerServiceContentView);


  Navigation.registerComponent('SboxHome', () => SboxHome);
  Navigation.registerComponent('SboxLoading', () => SboxLoading);
  Navigation.registerComponent('SboxNotification', () => SboxNotification);
  Navigation.registerComponent('LanguagesAndRegions', () => LanguagesAndRegions);

  Navigation.registerComponent('CmEat', () => CmEat);

  Navigation.registerComponent('CmLifeHome', () => CmLifeHome);

  Navigation.registerComponent('CodePushUpdate', () => CodePushUpdate);
  Navigation.registerComponent('IntroPage', () => IntroPage);
}
