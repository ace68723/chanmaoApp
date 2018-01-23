import { Navigation } from 'react-native-navigation';
import SboxHome from '../../SweetfulBox/Components/SboxHome/SboxHome';
import SboxMainTab from '../../SweetfulBox/Components/SboxMainTab/SboxMainTabViewController';
import SboxProductDetial from '../../SweetfulBox/Components/SboxProductDetial/SboxProductDetial';
import SboxCart from '../../SweetfulBox/Components/SboxCart/SboxCart';
import SboxCheckout from '../../SweetfulBox/Components/SboxCheckout/SboxCheckout';
import SboxAddCard from '../../SweetfulBox/Components/SboxAddCard/SboxAddCard';
import SboxAddressList from '../../SweetfulBox/Components/SboxAddressList/SboxAddressListViewController';
import SboxAddAddressInfo from '../../SweetfulBox/Components/SboxAddAddressInfo/SboxAddAddressInfo';
import SboxHistory from '../../SweetfulBox/Components/SboxHistory/SboxHistoryViewController';
import SboxHistoryOrderDetail from '../../SweetfulBox/Components/SboxHistoryOrderDetail/SboxHistoryOrderDetailViewController';
import SboxCategory from '../../SweetfulBox/Components/SboxCategory/SboxCategoryViewController';
import SboxHomeAlert from '../../SweetfulBox/Components/SboxHomeAlert/SboxHomeAlert';

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

module.exports = SboxMainTab;
