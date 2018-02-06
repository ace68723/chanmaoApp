import { Navigation } from 'react-native-navigation';
import Tabs from '../Components/Tabs';
import CmEatMenu from '../Components/Menu';
import CmEatCheckout from '../Components/Checkout';
import CmEatAddress from '../Components/Address'

Navigation.registerComponent('CmEatMenu', () => CmEatMenu);
Navigation.registerComponent('CmEatCheckout', () => CmEatCheckout);
Navigation.registerComponent('CmEatAddress', () => CmEatAddress);

module.exports = Tabs;
// module.exports = SboxHistory;
