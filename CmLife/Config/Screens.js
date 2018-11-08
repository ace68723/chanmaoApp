import {Navigation} from 'react-native-navigation';

import Home from '../CmWash/Components/Home/Home';
import Orders from '../CmWash/Components/Orders/Orders';
import Settings from '../CmWash/Components/Settings/Settings';
import Checkout from '../CmWash/Components/Checkout/Checkout';
import CmWashingHomeAlert from '../CmWash/Components/HomeAlert/CmWashingHomeAlert';
import CmLifeHome from '../CmLifeHome/Home'
import CmLifeMainTab from '../CmWash/Components/CmWashMainTabView/CmWashMainTabViewController';
Navigation.registerComponent('checkout', () => Checkout);
Navigation.registerComponent('home', () => Home);
Navigation.registerComponent('orders', () => Orders);
Navigation.registerComponent('settings', () => Settings);

Navigation.registerComponent('CmWashingHomeAlert', () => CmWashingHomeAlert);
Navigation.registerComponent('CmLifeHome', () => CmLifeHome);
Navigation.registerComponent('CmLifeMainTab', () => CmLifeMainTab);
module.exports = CmLifeHome;
