import { Navigation } from 'react-native-navigation';
// import SboxHome from '../Components/SboxHome/SboxHome';
import SboxMainTab from '../Components/SboxMainTab/SboxMainTabViewController';
import SboxAddAddress from '../Components/SboxAddAddress/index';
import SboxProductDetial from '../Components/SboxProductDetial/';
import SboxCart from '../Components/SboxCart';
import SboxCheckout from '../Components/SboxCheckout';
import SboxAddCard from '../Components/SboxAddCard/SboxAddCard';
import SboxChooseCardType from '../Components/SboxAddCard/SboxChooseCardType';
import SboxAddAddressInfo from '../Components/SboxAddAddressInfo/SboxAddAddressInfo';
import SboxHistory from '../Components/SboxHistory/SboxHistoryViewController';
import SboxHistoryOrderDetail from '../Components/SboxHistoryOrderDetail/SboxHistoryOrderDetailViewController';
import SboxCategory from '../Components/SboxCategory/SboxCategoryViewController';
import SboxHomeAlert from '../Components/SboxHomeAlert/SboxHomeAlert';
import SboxAddressAlert from '../Components/SboxHomeAlert/SboxAddressAlert';
import SboxCartAlert from '../Components/SboxHomeAlert/SboxCartAlert';
import SboxAboutContact from '../Components/SboxAbout/SboxAboutContact';
import SboxNotification from '../Components/SboxNotification/SboxNotification';
import SboxProductSearch from '../Components/SboxProductTab/SboxProductSearch';


Navigation.registerComponent('SboxProductDetial', () => SboxProductDetial);
Navigation.registerComponent('SboxCart', () => SboxCart);
Navigation.registerComponent('SboxCheckout', () => SboxCheckout);
Navigation.registerComponent('SboxAddCard', () => SboxAddCard);
Navigation.registerComponent('SboxChooseCardType', () => SboxChooseCardType);
Navigation.registerComponent('SboxAddAddress', () => SboxAddAddress);
Navigation.registerComponent('SboxAddAddressInfo', () => SboxAddAddressInfo);
Navigation.registerComponent('SboxHistory', () => SboxHistory);
Navigation.registerComponent('SboxHistoryOrderDetail', () => SboxHistoryOrderDetail);
Navigation.registerComponent('SboxCategory', () => SboxCategory);
Navigation.registerComponent('SboxHomeAlert', () => SboxHomeAlert);
Navigation.registerComponent('SboxAddressAlert', () => SboxAddressAlert);
Navigation.registerComponent('SboxCartAlert', () => SboxCartAlert);
Navigation.registerComponent('SboxAboutContact', () => SboxAboutContact);
Navigation.registerComponent('SboxNotification', () => SboxNotification);
Navigation.registerComponent('SboxMainTab', () => SboxMainTab);
Navigation.registerComponent('SboxProductSearch', () => SboxProductSearch);

module.exports = SboxMainTab;


// module.exports = SboxHistory;  SboxMainTab
