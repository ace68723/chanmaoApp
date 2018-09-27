import { Navigation } from 'react-native-navigation';
import CmEatTabs from '../Components/Tabs';
import CmEatMenu from '../Components/Menu';
import CmEatCheckout from '../Components/Checkout';
import CmEatAddress from '../Components/Address';
import CmEatAddInfo from '../Components/Address/CmEatAddInfo';
import CmEatAboutUs from '../Components/Setting/AboutUs';
import CmEatLanguageSettings from '../Components/Setting/LanguageSettings'
import CmEatMenuSearch from '../Components/Menu/CmEatMenuSearch';
import CmEatHistory from '../Components/History/HistoryTab';
import CmSecondMenu from '../Components/CmSecondMenu/SecondMenu';
import CmRestaurantSearch from '../Components/Restaurant/RestaurantSearch/CmRestaurantSearch';
import CmChooseCardType from '../Components/AddCard/ChooseCardType';
import CmAddCard from '../Components/AddCard/AddCard';
import CmCommentDetail from '../Components/History/CommentDetail';



Navigation.registerComponent('CmEatMenu', () => CmEatMenu);
Navigation.registerComponent('CmEatCheckout', () => CmEatCheckout);
Navigation.registerComponent('CmEatAddress', () => CmEatAddress);
Navigation.registerComponent('CmEatAddInfo', () => CmEatAddInfo);
Navigation.registerComponent('CmEatAboutUs', () => CmEatAboutUs);
Navigation.registerComponent('CmEatLanguageSettings', () => CmEatLanguageSettings);

Navigation.registerComponent('CmEatMenuSearch', () => CmEatMenuSearch);
Navigation.registerComponent('CmSecondMenu', () => CmSecondMenu);
Navigation.registerComponent('CmRestaurantSearch', () => CmRestaurantSearch);

Navigation.registerComponent('CmEatTabs', () => CmEatTabs);
Navigation.registerComponent('CmEatHistory', () => CmEatHistory);
Navigation.registerComponent('CmChooseCardType', () => CmChooseCardType);
Navigation.registerComponent('CmAddCard', () => CmAddCard);
Navigation.registerComponent('CmCommentDetail', () => CmCommentDetail);
module.exports = CmEatTabs;
// module.exports = SboxHistory;
