import OrderAPI from './OrderAPI';
import {
  NativeModules,
} from 'react-native';
const StripeBridge = NativeModules.StripeBridge;

import {GetUserInfo} from '../../../App/Modules/Database';
import {sbox_getAllItemsFromCart} from '../../Modules/Database';
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
      const {uid,token,version} = GetUserInfo();
      const lo_data = {
        authortoken:token,
        iv_token: cardToken
      }
      const res = await OrderAPI.addCard(lo_data);

      const cardInfoList = res.ea_card_info;
      updateCardInfo(cardInfoList);
      return res
    } catch (e) {
      throw e
    }
  },
  async getOrderBefore(io_data) {
    try {
      const {uid,token,version} = GetUserInfo();
      if(!token) return {shouldDoAuth:true}

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
      }
      console.log(lo_data)
      const res = await OrderAPI.getOrderBefore(lo_data);
      console.log(res)
      eo_data = Object.assign(res,{shouldDoAuth:false});

      return eo_data
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async checkout(box) {
    try {
      const {uid,token,version} = GetUserInfo();
      if(!token) throw 'no token'

      let boxes = [];
      let prod = [];
      for (var i = 0; i < box.product.length; i++) {
        const product = box.product[i];
        const pbid = product.pbid;
        const amount = product.selectedAmount;
        prod.push({pbid,amount})
      }
      boxes.push({prod})
      const lo_data = {
        authortoken:token,
        ia_boxes: boxes,
      }
      const res = await OrderAPI.checkout(lo_data);

      if(res.ev_error === 0) {
        init_sbox();
        return res
      } else {
        throw e
      }
    } catch (e) {

      throw e
    }

  }
}
