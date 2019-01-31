import CheckoutAPI from './CheckoutAPI';
import {
  NativeModules,
} from 'react-native';
import OrderAPI from '../OrderModule/OrderAPI';
import {GetUserInfo} from '../../../../App/Modules/Database';
const StripeBridge = NativeModules.StripeBridge;

// import {GetUserInfo} from '../../../App/Modules/Database';
// import { sbox_getAllItemsFromCart, sbox_updateCartStock, sbox_deleteCart } from '../../Modules/Database';
export default  {
  async addCard({cardNumber,expMonth,expYear,cvv,postal,name}){
    try {
       cardNumber = cardNumber.replace(/ /g,'');
       expMonth = Number(expMonth);
       expYear = Number(expYear);
       cvv = cvv;
      const cardToken = await StripeBridge.pay( cardNumber,
                                                expMonth,
                                                expYear,
                                                cvv,
                                                postal,
                                                name);

      if(!cardToken) throw 'no cardToken'
      // alert(cardToken);
        const {uid,token,version} = GetUserInfo();
      const lo_data = {
        iv_token: cardToken,
        authortoken:token,
      }

      const res = await CheckoutAPI.addCard(lo_data);
      console.log(res)
      if(res.ev_error === 1) { throw 'add card fail'}
      const eo_data = res.ea_card_info;
      return eo_data;
    } catch (e) {
      console.log(e);
      alert('您输入的支付信息输入有误');
      throw e
    }
  },
  async getOrderBefore() {
    try {
      const lo_data = {
          "uid":1
      }
      const res = await CheckoutAPI.getOrderBefore(lo_data);
      console.log(res)
      // console.log(res);
      const eo_data ={
        last4: res.ev_last4,
      }
      console.log('last4dgs: '+res.ev_last4)
      return eo_data

    } catch (e) {
      console.log('123')
      console.log(e);
      throw e
    }
  },
  async addOrder(sku_id, value) {
    try {
      const lo_data = {
          uid:1,
          productLists: [
            {
              sku_id:sku_id,
              price:parseFloat(value)
            }
          ]
      }
      const res = await CheckoutAPI.addOrder(lo_data);
      console.log(res)
      // console.log(res);
      const eo_data ={
        oid: res.product_list[0].oid
      }
      return eo_data

    } catch (e) {
      console.log('123')
      console.log(e);
      throw e
    }
  },
}
