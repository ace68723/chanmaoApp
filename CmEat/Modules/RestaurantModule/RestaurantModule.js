'use strict';
const  RestaurantApi        = require( './RestaurantApi');
const  Alert                = require('../System/Alert');
const  AddressModule        = require('../AddressModule/AddressModule');
const  MenuStore            = require('../../Stores/MenuStore');
import {
  UpdateAllRestaurants,
  cme_getCheckout,
  cme_beforCheckout,
  cme_updateCalculateDeliveryFee,
  cme_getCalculateDeliveryFee,
} from '../../../App/Modules/Database';

const RestaurantModule = {
  async getMenu(reqData){
    try {
      const data = await RestaurantApi.getMenu(reqData);
      if(data.result == 0){
        return data
      }else{
        Alert.errorAlert(data.message)
        return
      }
    } catch (e) {
      Alert.errorAlert('菜单未知错误')
    }
  },
  async beforCheckout(reqData){
      try{
          const data = await RestaurantApi.beforCheckout(reqData);
          if(data.result == 0){
            const pretax = data.pretax;
            const pretax_ori = data.pretax_ori;
            const promoted = data.promoted;
            const total = data.total;
            const eo_data ={pretax,pretax_ori,promoted,total}
            const startAmount = reqData.startAmount;
            let rid = reqData.rid;
            if(typeof rid !== 'string'){
              rid = String(rid)
            }
            cme_beforCheckout({pretax,total,rid,startAmount})
            return eo_data
          }else{
            Alert.errorAlert(data.message)
          }

      }catch (error){
        error = error.toString()
        Alert.errorAlert('结账未知错误: '+error)
      }
  },
  async calculateDeliveryFee(reqData){

      try{
        const code= "";
        const {pretax,rid,uaid,startAmount,dltypeObj} = cme_getCalculateDeliveryFee();
        let dltype;
        if(dltypeObj){
          dltype = dltypeObj.value;
        }else{
          dltype = '1';
        }


        if(Number(pretax)<startAmount){
           dltype = '0';
        }
        if(dltype != '0'){
          dltype = '1';
        }

        reqData = Object.assign({},reqData,{code,dltype,pretax,rid,uaid})
        const res = await RestaurantApi.calculateDeliveryFee(reqData);
        if(res.result == 0){
          const dlexp = JSON.stringify(res.dlexp);
          const dltype = res.dltype;
          const message = res.message;
          const pretax = res.pretax;
          const pretax_ori = res.pretax_ori;
          const result = res.result;
          const total = res.total;
          const ex_data ={dlexp,dltype,message,pretax,pretax_ori,result,total,startAmount}
          cme_updateCalculateDeliveryFee({dltype,dlexp});
          return ex_data
        }else{
        }
      }catch (e){
        console.log(e)
      }
  },
  async checkout(io_data){
      try{
        const token   = io_data.token;
        const {dltype,pretax,rid,uaid,dlexp} = cme_getCheckout();
        let items   = MenuStore.getCart();
        const comment = io_data.comment;
        items.forEach((item)=>{
          item.amount = item.qty;
          item.ds_id = item.id;
          item.qty = null;
        })
        const reqData = {token,dltype,pretax,rid,uaid,dlexp,items,comment}
        const data = await RestaurantApi.checkout(reqData);
        return data
      }catch (e){
        console.log(e)
      }
  }
}

module.exports = RestaurantModule;
