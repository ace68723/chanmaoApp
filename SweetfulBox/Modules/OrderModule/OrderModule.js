import OrderAPI from './OrderAPI';
import {
  NativeModules,
} from 'react-native';
const StripeBridge = NativeModules.StripeBridge;

import {GetUserInfo} from '../../../App/Modules/Database';
import { sbox_getAllItemsFromCart, sbox_updateCartStock, sbox_deleteCart } from '../../Modules/Database';
export default  {
  async putUserAddr(io_data){
    const {uid,token,version} = GetUserInfo();
    io_data = {
      authortoken:token,
      ia_prod: [
    {
      "pbid": 1,
      "amount": 2
    }]
    }

    try {
      const lo_data ={
        authortoken: io_data.authortoken,
        ia_prod: io_data.ia_prod,
      }
      const orderBefore = await OrderAPI.getOrderBefore(lo_data);


      if(orderBefore.ev_error === 0 ){
        const eo_data ={
          cusid: orderBefore.ev_cusid,
          last4: orderBefore.ev_last4,
          oos: orderBefore.ev_oos,
          prod: orderBefore.ev_prod,
          addr: orderBefore.ev_addr,
        }
        return eo_data
      }else{
        const errorMessage = orderBefore.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  },
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
      const res = await OrderAPI.addCard(lo_data);
      if(res.ev_error === 1) { throw 'add card fail'}
      const eo_data = res.ea_card_info;
      return eo_data
    } catch (e) {
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
      // console.log(eo_data);
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
  async checkout(comment) {
    try {
      const {uid,token,version} = GetUserInfo();
      if(!token) return {checkoutStatus:"shouldDoAuth"}

      let allItems = sbox_getAllItemsFromCart();
      let prod = [];
      allItems.forEach((item) => {
        if(item.sku_quantity > item.sku_amount) return {checkoutStatus:"soldOut"};
        const {sku_id,sku_quantity} = item;
        prod.push({sku_id,sku_quantity});
      })

      const lo_data = {
        authortoken:token,
        prod: prod,
        version:version,
        comment:comment,
      }
      const res = await OrderAPI.checkout(lo_data);

      if(res.ev_error === 0) {
        sbox_deleteCart();
        return {checkoutStatus:"successful"};
        return res
      } else {
        if(res.ev_message === 40007){
          return {checkoutStatus:"soldOut"};
        }else{
          return {checkoutStatus:"error"};
        }
      }
    } catch (e) {

      return {checkoutStatus:"error"};
    }

  }
}
