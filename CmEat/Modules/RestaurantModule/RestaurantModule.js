'use strict';
const  RestaurantApi        = require( './RestaurantApi');
const  Alert                = require('../System/Alert');
const  AddressModule        = require('../AddressModule/AddressModule');
const  MenuStore            = require('../../Stores/MenuStore');
import {
	Platform,
} from 'react-native';
import {
  UpdateAllRestaurants,
  cme_getCheckout,
  cme_beforCheckout,
  cme_updateCalculateDeliveryFee,
  cme_getCalculateDeliveryFee,
  GetUserInfo,
  cme_getSelectedAddress
} from '../../../App/Modules/Database';
import LocationModule from '../../../App/Modules/System/LocationModule';
const RestaurantModule = {
  async getMenu(io_Data){
    try {
			const reqData = {rid: parseInt(io_Data.rid), token: io_Data.token}
      const data = await RestaurantApi.getMenu(reqData);
      if(data.ev_error == 0){ //new api
      // if(data.result == 0){
        return data
      }else{
        Alert.errorAlert(data.message)
        return
      }
    } catch (e) {
      Alert.errorAlert('菜单未知错误')
    }
  },
  async getTag(){

    try{
      let userData = GetUserInfo();
      let data = await RestaurantApi.getTag(GetUserInfo());

      if(data.ev_error == 0){ //new api
        // if(data.result == 0){

          return data
        }else{
          Alert.errorAlert(data.message)
          return
        }
    }catch (e) {
      console.log(e)
    }
  },
  async getRestaurantByTag(cid){
    try{
      let userData = GetUserInfo();
      const selectedAddress = cme_getSelectedAddress();
      let userlocation;
      if (selectedAddress) {
        userlocation =  selectedAddress.loc_la +','+selectedAddress.loc_lo;

      } else {
        userlocation = await LocationModule.getCurrentPosition();
      }
      userData.userloc = userlocation;

      let data = await RestaurantApi.getRestaurantByTag(userData,cid);
      return data.ea_restaurant_list;
    }catch (e) {
      console.log(e)
    }
  },
  async beforCheckout(reqData){
      try{
					const { version } = GetUserInfo();
					reqData.version = version;
          const result = await RestaurantApi.beforCheckout(reqData);
					if(result.ev_error == 0){
          // if(data.result == 0){
						let data = result.ea_response;
            const pretax = data.pretax;
            const pretax_ori = data.pretax_ori;
            const promoted = data.promoted;
            const total = data.total;
						const cusid = data.ev_cusid;
						const available_payment_channels = data.available_payment_channels;
						available_payment_channels.push({channel: 40, visa_fee: 2});
						const last_payment_channel = data.last_payment_channel;
						let last4 = "";
						let brand = "";
						let unionpay_last4 = '';
						if (data.ev_last4) {
							last4 = data.ev_last4;
						}
						if (data.ev_last4) {
							brand = data.ev_brand;
						}
						if (data.ev_unionpay_last4) {
							unionpay_last4 = data.ev_unionpay_last4;
						}
						// last4 = "1234";
						// brand = "visa";
						// cusid = "123f12";
            const eo_data ={pretax,
														pretax_ori,
														promoted,
														total,
														cusid,
														last4,
														brand,
														available_payment_channels,
														last_payment_channel,
														unionpay_last4}
            const startAmount = reqData.startAmount;
            let rid = reqData.rid;
            if(typeof rid !== 'string'){
              rid = String(rid)
            }
            cme_beforCheckout({pretax,total,rid,startAmount})
            return eo_data
          }else{
            Alert.errorAlert(result.ev_message)
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
					let lo_tps = [];
					if (item.tpgs) {
						for (let tpg_id in item.tpgs) {
							for (let tp_id in item.tpgs[tpg_id].tps) {
								if (item.tpgs[tpg_id].tps[tp_id].quantity > 0) {
									lo_tps.push({tp_id: tp_id, tp_quantity: item.tpgs[tpg_id].tps[tp_id].quantity});
								}
							}
						}
						item.tps = lo_tps;
					}
					item.tpgs = null;
        });
        let channel
        if (Platform.OS === 'ios') {
          channel = 1;
        } else if (Platform.OS === 'android') {
          channel = 2;
        }
        // const reqData = {token,dltype,pretax,rid,uaid,dlexp,items,comment,channel, payment_channel: io_data.payment_channel, tips: io_data.tips}
				const reqData = {token,
												 dltype,
												 pretax,
												 rid,
												 uaid,
												 dlexp,
												 items,
												 comment,
												 channel,
												 payment_channel: io_data.payment_channel,
												 tips: io_data.tips,
											   visa_fee: io_data.visa_fee};
        const data = await RestaurantApi.checkout(reqData);
        return data;
      }catch (e){
        console.log(e)
      }
  }
}

module.exports = RestaurantModule;
