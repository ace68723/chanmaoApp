import OrderAPI from './OrderAPI';
import {
  NativeModules,
} from 'react-native';
const StripeBridge = NativeModules.StripeBridge;

import {updateCardInfo,GetUserInfo,init_sbox} from '../../../App/Modules/Database';
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
      if(!token) throw 'no token'
      let _productList = [];
      for (var i = 0; i < io_data.productList.length; i++) {
        const product = io_data.productList[i];
        const pbid = product.pbid;
        const amount = product.selectedAmount;
        const _product = {pbid,amount}
        _productList.push(_product);
      }
      const lo_data = {
        authortoken:token,
        ia_prod: _productList,
      }
      const res = await OrderAPI.getOrderBefore(lo_data);
      console.log(res)
      return res
    } catch (e) {

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
