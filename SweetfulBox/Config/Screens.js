import { Navigation } from 'react-native-navigation';
import SboxHome from '../Components/SboxHome/SboxHome';
import SboxMainTab from '../Components/SboxMainTab/SboxMainTabViewController';
import SboxAddAddress from '../Components/SboxAddAddress/index';
import SboxProductDetial from '../Components/SboxProductDetial/SboxProductDetial';
import SboxCart from '../Components/SboxCart/SboxCart';
import SboxCheckout from '../Components/SboxCheckout/index';
import SboxAddCard from '../Components/SboxAddCard/SboxAddCard';
import SboxAddressList from '../Components/SboxAddressList/SboxAddressListViewController';
import SboxAddAddressInfo from '../Components/SboxAddAddressInfo/SboxAddAddressInfo';
import SboxHistory from '../Components/SboxHistory/SboxHistoryViewController';
import SboxHistoryOrderDetail from '../Components/SboxHistoryOrderDetail/SboxHistoryOrderDetailViewController';
import SboxCategory from '../Components/SboxCategory/SboxCategoryViewController';
import SboxHomeAlert from '../Components/SboxHomeAlert/SboxHomeAlert';
import SboxAddressAlert from '../Components/SboxHomeAlert/SboxAddressAlert';
import SboxCartAlert from '../Components/SboxHomeAlert/SboxCartAlert';

Navigation.registerComponent('SboxProductDetial', () => SboxProductDetial);
Navigation.registerComponent('SboxCart', () => SboxCart);
Navigation.registerComponent('SboxCheckout', () => SboxCheckout);
Navigation.registerComponent('SboxAddCard', () => SboxAddCard);
Navigation.registerComponent('SboxAddressList', () => SboxAddressList);
Navigation.registerComponent('SboxAddAddressInfo', () => SboxAddAddressInfo);
Navigation.registerComponent('SboxHistory', () => SboxHistory);
Navigation.registerComponent('SboxHistoryOrderDetail', () => SboxHistoryOrderDetail);
Navigation.registerComponent('SboxCategory', () => SboxCategory);
Navigation.registerComponent('SboxHomeAlert', () => SboxHomeAlert);
Navigation.registerComponent('SboxAddressAlert', () => SboxAddressAlert);
Navigation.registerComponent('SboxCartAlert', () => SboxCartAlert);


module.exports = SboxMainTab;
// module.exports = SboxAddAddress;
