import CheckoutAPI from './CheckoutAPI';
import {
  NativeModules,
} from 'react-native';
const StripeBridge = NativeModules.StripeBridge;

import {GetUserInfo} from '../../../App/Modules/Database';
// import { sbox_getAllItemsFromCart, sbox_updateCartStock, sbox_deleteCart } from '../../Modules/Database';
export default  {
  async addCard({cardNumber,expMonth,expYear,cvv}){
    try {
       cardNumber = cardNumber.replace(/ /g,'');
       expMonth = Number(expMonth);
       expYear = Number(expYear);
       cvv = cvv;
      const cardToken = await StripeBridge.pay( cardNumber,
                                                expMonth,
                                                expYear,
                                                cvv);
      if(!cardToken) throw 'no cardToken'
      // alert(cardToken);
      const {uid,token,version} = GetUserInfo();
      const lo_data = {
        authortoken:token,
        iv_token: cardToken
      }
      const res = await CheckoutAPI.addCard(lo_data);
      if(res.ev_error === 1) { throw 'add card fail'}
      const eo_data = res.ea_card_info;
      return eo_data
    } catch (e) {
      console.log(e);
      alert('您输入的支付信息输入有误');
      throw e
    }
  },
  async getOrderBefore() {
    try {
      const {uid,token,version} = GetUserInfo();
      if(!token) return {checkoutStatus:"shouldDoAuth"}

      const allItems = sbox_getAllItemsFromCart();
      let _productList = [];
      allItems.forEach((item)=>{
          const sku_id = item.sku_id;
          const sku_quantity = item.sku_quantity;
          _productList.push({sku_id,sku_quantity});
      })
      const lo_data = {
        authortoken:token,
        ia_prod: _productList,
        version:version,
      }
      const res = await OrderAPI.getOrderBefore(lo_data);
      // console.log(res);
      const eo_data ={
        prod: res.ea_prod,
        addr: res.eo_addr,
        cusid: res.ev_cusid,
        deliFee: res.ev_deliFee,
        last4: res.ev_last4,
        total:res.ev_total,
        ev_original_total:res.ev_original_total,
        ea_discount_message:res.ea_discount_message,
      }
      if(res.ev_error === 1) {
        if(res.ev_message >= 10000 && res.ev_message <= 20000 ){
          return {checkoutStatus:"shouldDoAuth"}
        }else{
          throw `getOrderBefore ${res.ev_message} `
        }
      }

      if(res.ev_oos === 1) {
        await sbox_updateCartStock(res.ea_prod);
        return {checkoutStatus:"soldOut"}
      }
      if(!res.eo_addr.hasOwnProperty('abid')){
        return  Object.assign(eo_data,{checkoutStatus:"shouldAddAddress"})
      }

      if(!res.ev_cusid){
        return Object.assign(eo_data,{checkoutStatus:"shouldAddCard"})
      }

      eo_data = Object.assign(eo_data,{checkoutStatus:"readyToCheckout"});

      return eo_data

    } catch ({ev_message}) {
      console.log(ev_message);
      throw `getOrderBefore ${ev_message} `
    }
  },
}