import { Navigation } from 'react-native-navigation';
import Tabs from '../Components/Tabs';
import CmEatMenu from '../Components/Menu';
import CmEatCheckout from '../Components/Checkout';

Navigation.registerComponent('CmEatMenu', () => CmEatMenu);
Navigation.registerComponent('CmEatCheckout', () => CmEatCheckout);

module.exports = Tabs;
// module.exports = SboxHistory;
