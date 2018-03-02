import { Navigation } from 'react-native-navigation';
import CmEatTabs from '../Components/Tabs';
import CmEatMenu from '../Components/Menu';
import CmEatCheckout from '../Components/Checkout';
import CmEatAddress from '../Components/Address';
import CmEatAddInfo from '../Components/Address/CmEatAddInfo';
import CmEatAboutUs from '../Components/Setting/AboutUs';
import CmEatMenuSearch from '../Components/Menu/CmEatMenuSearch';
import CmSecondMenu from '../Components/CmSecondMenu/SecondMenu';



Navigation.registerComponent('CmEatMenu', () => CmEatMenu);
Navigation.registerComponent('CmEatCheckout', () => CmEatCheckout);
Navigation.registerComponent('CmEatAddress', () => CmEatAddress);
Navigation.registerComponent('CmEatAddInfo', () => CmEatAddInfo);
Navigation.registerComponent('CmEatAboutUs', () => CmEatAboutUs);
Navigation.registerComponent('CmEatMenuSearch', () => CmEatMenuSearch);
Navigation.registerComponent('CmSecondMenu', () => CmSecondMenu);
Navigation.registerComponent('CmEatTabs', () => CmEatTabs);
module.exports = CmEatTabs;
// module.exports = SboxHistory;
