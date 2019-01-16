import {
  NativeModules,
} from 'react-native';
import BagAPI from '../BagModule/BagAPI';
const StripeBridge = NativeModules.StripeBridge;

// import {GetUserInfo} from '../../../App/Modules/Database';
// import { sbox_getAllItemsFromCart, sbox_updateCartStock, sbox_deleteCart } from '../../Modules/Database';
export default  {
  async getCardList() {
    try {
      const lo_data = {
          "uid":1
      }
      const res = await BagAPI.getCardList(lo_data);
      return res
    } catch (e) {
      throw e
    }
  },
  async getCardBalance(account_id) {
    try {
      const lo_data = {
        account_id:account_id
      }
      const res = await BagAPI.getCardBalance(lo_data);
     
      return res

    } catch (e) {
      throw e
    }
  },
}
