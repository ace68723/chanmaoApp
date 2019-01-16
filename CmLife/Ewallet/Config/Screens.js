import { Navigation } from 'react-native-navigation';
import ProductDetail from '../Components/EwalletProductDetail';
import CardDetail from '../Components/CardDetail';
import Home from '../Components/Home';
import EwalletBag from '../Components/EwalletBag';
import AddAddress from '../Components/AddAddress';
import AddAddressInfo from '../Components/AddAddressInfo/AddAddressInfo';
import Checkout from '../Components/Checkout';
import CheckoutStatus from '../Components/CheckoutStatus';
import About from '../Components/About/AboutContact';
import EwalletMainTab from '../Components/EwalletMainTab'
import AddCard from '../Components/AddCard/AddCard';
import ChooseCardType from '../Components/AddCard/ChooseCardType';
// register all screens of the app (including internal ones)


Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('ProductDetail', () => ProductDetail);
Navigation.registerComponent('AddAddress', () => AddAddress);
Navigation.registerComponent('AddAddressInfo', () => AddAddressInfo);
Navigation.registerComponent('Checkout', () => Checkout);
Navigation.registerComponent('AddCard', () => AddCard);
Navigation.registerComponent('ChooseCardType', () => ChooseCardType);
Navigation.registerComponent('EwalletBag', () => EwalletBag);
Navigation.registerComponent('CardDetail', () => CardDetail);
Navigation.registerComponent('About', () => About);
Navigation.registerComponent('EwalletMainTab', () => EwalletMainTab);
Navigation.registerComponent('CheckoutStatus', () => CheckoutStatus);
module.exports = EwalletMainTab;

// module.exports = SboxHistory;  SboxMainTab
