import {Navigation} from 'react-native-navigation';

import Home from '../CmWash/Components/Home/Home';
import Orders from '../CmWash/Components/Orders/Orders';
import Settings from '../CmWash/Components/Settings/Settings';
import Checkout from '../CmWash/Components/Checkout/Checkout';
import CmWashingHomeAlert from '../CmWash/Components/HomeAlert/CmWashingHomeAlert';

import CmWashAddAddress from '../CmWash/Components/CmWashAddAddress/index';
import CmLifeHome from '../CmLifeHome/Home'
import CmLifeMainTab from '../CmWash/Components/CmWashMainTabView/CmWashMainTabViewController';
import CmWashAddAddressInfo from '../CmWash/Components/CmWashAddAddressInfo/AddAddressInfo';

import CmWashAddCard from '../CmWash/Components/CmWashAddCard/CmWashAddCard';

import CmWashAddressAlert from '../CmWash/Components/HomeAlert/CmWashAddressAlert';
import CmWashChooseCardType from '../CmWash/Components/CmWashAddCard/CmWashChooseCardType';
Navigation.registerComponent('checkout', () => Checkout);
Navigation.registerComponent('home', () => Home);
Navigation.registerComponent('orders', () => Orders);
Navigation.registerComponent('settings', () => Settings);

Navigation.registerComponent('CmWashingHomeAlert', () => CmWashingHomeAlert);
Navigation.registerComponent('CmLifeHome', () => CmLifeHome);
Navigation.registerComponent('CmLifeMainTab', () => CmLifeMainTab);
Navigation.registerComponent('CmWashAddAddress', () => CmWashAddAddress);
Navigation.registerComponent('CmWashAddAddressInfo', () => CmWashAddAddressInfo);
Navigation.registerComponent('CmWashAddCard', () => CmWashAddCard);
Navigation.registerComponent('CmWashChooseCardType', () => CmWashChooseCardType);
Navigation.registerComponent('CmWashAddressAlert', () => CmWashAddressAlert);
module.exports = CmLifeHome;
