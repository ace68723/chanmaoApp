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

import EwalletProductDetail from '../Ewallet/Components/EwalletProductDetail';
import EwalletCardDetail from '../Ewallet/Components/CardDetail';
import EwalletHome from '../Ewallet/Components/Home';
import EwalletBag from '../Ewallet/Components/EwalletBag';
import EwalletAddAddress from '../Ewallet/Components/AddAddress';
import EwalletAddAddressInfo from '../Ewallet/Components/AddAddressInfo/AddAddressInfo';
import EwalletCheckout from '../Ewallet/Components/Checkout';
import EwalletCheckoutStatus from '../Ewallet/Components/CheckoutStatus';
import EwalletAbout from '../Ewallet/Components/About/AboutContact';
import EwalletMainTab from '../Ewallet/Components/EwalletMainTab'
import EwalletAddCard from '../Ewallet/Components/AddCard/AddCard';
import EwalletChooseCardType from '../Ewallet/Components/AddCard/ChooseCardType';


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

Navigation.registerComponent('EwalletHome', () => EwalletHome);
Navigation.registerComponent('EwalletProductDetail', () => EwalletProductDetail);
Navigation.registerComponent('EwalletAddAddress', () => EwalletAddAddress);
Navigation.registerComponent('EwalletAddAddressInfo', () => EwalletAddAddressInfo);
Navigation.registerComponent('EwalletCheckout', () => EwalletCheckout);
Navigation.registerComponent('EwalletAddCard', () => EwalletAddCard);
Navigation.registerComponent('EwalletChooseCardType', () => EwalletChooseCardType);
Navigation.registerComponent('EwalletBag', () => EwalletBag);
Navigation.registerComponent('EwalletCardDetail', () => EwalletCardDetail);
Navigation.registerComponent('EwalletAbout', () => EwalletAbout);
Navigation.registerComponent('EwalletMainTab', () => EwalletMainTab);
Navigation.registerComponent('EwalletCheckoutStatus', () => EwalletCheckoutStatus);
module.exports = CmLifeHome;
