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
      return eo_data;
    } catch (e) {
      console.log(e);
      // alert('您输入的支付信息输入有误');
      throw e
    }
  },
  async addUnionpayCard({cardNumber, expMonth, expYear, first_name, last_name}){
    try {
       account_number = cardNumber.replace(/ /g,'');
       expire_month = expMonth;
       expire_year = expYear;
       first_name = first_name;
       last_name = last_name;

       const lo_data = {
         account_number:account_number,
         expire_month:expire_month,
         expire_year:expire_year,
         first_name:first_name,
         last_name:last_name,
       }
       const res = await CheckoutAPI.addUnionpayCard(lo_data);
       if(res.ev_error === 1) { throw 'add unionpay card fail'}
       const eo_data = res.ev_ret;
       return eo_data;

      // const cardToken = await StripeBridge.pay( cardNumber,
      //                                           expMonth,
      //                                           expYear,
      //                                           cvv);
      // if(!cardToken) throw 'no cardToken'
      // // alert(cardToken);
      // const {uid,token,version} = GetUserInfo();
      // const lo_data = {
      //   authortoken:token,
      //   iv_token: cardToken
      // }
      // const res = await CheckoutAPI.addCard(lo_data);
      // if(res.ev_error === 1) { throw 'add card fail'}
      // const eo_data = res.ea_card_info;
      // return eo_data;
    } catch (e) {
      console.log(e);
      // alert('您输入的支付信息输入有误');
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
  async oneTimeCharge(io_data){
    try{
      const {uid,token,version} = GetUserInfo();
      let data = {
        authortoken: token,
        amount: parseInt(io_data.amount*100),
        oid: parseInt(io_data.oid),
        token: io_data.token
      }
      let res = await CheckoutAPI.oneTimeCharge(data);
      if(res.ev_error === 1) throw res;
      else return 'success';
    }catch(e){
      console.log(e)
      return 'failed';
    }
  },
  async signAlipayOrder(order){
    try {
      let orderStr = '';
      Object.keys(order).forEach(function(key) {
          orderStr += key + '="' + order[key] + '"&';
      });
      orderStr = orderStr.slice(0, orderStr.length - 1);
      const {uid,token,version} = GetUserInfo();
      const lo_data = {
        Authortoken: token,
        sign_str: orderStr,
        data: order,
      }
      const res = await CheckoutAPI.signAlipayOrder(lo_data);
      if(res.ev_error === 1) { throw 'sign fail'}
      const eo_data = res;
      return eo_data;
    } catch (e) {
      console.log(e);
      alert('签名失败');
      throw e
    }
  },
  async stripeChargeAndUpdate(reqData) {
    try {
      const res = await CheckoutAPI.stripeChargeAndUpdate(reqData);
      return res;
    } catch (e) {
      console.log(e);
      throw e
    }
  }
}
