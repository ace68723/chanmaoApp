'use strict';
const   HistoryApi        = require( './HistoryApi');
const  Alert          = require('../System/Alert');
import  {
  cme_getRegion
} from '../../../App/Modules/Database';
const  HistoryModule = {

  // ===================================
  // getOrderData API INTERFACE
  // API             Module
  // ===================================
  // cell            cell
  // channel         channel
  // comment         comment
  // created         created
  // dltype          deliveryType
  // oid             orderId
  // ori_pretax      originalPretax
  // ori_total       originalTotal
  // pretax          pretax
  // rid             rid
  // rraddr          restaurantAddress
  // rrname          restaurantName
  // status          orderStatus
  // total           total
  // uaddr           userAddress
  // uaid            userAid
  // uid             userId
  // uname           username
  // version         version
    getOrderData(token){
          return new Promise((resolve, reject) => {
            HistoryApi.getOrderData(token)
              .then(data => {
                if (data.ev_error == 0){
                // if(data.result == 0){
                    // resolve(data.orders);
                    resolve(data.ea_history_list);
                }else{
                  // Alert.errorAlert(data.message)
                  // reject(data.result);
                  Alert.errorAlert(data.ev_message)
                  reject(data.ev_error);
                }

              })
              .catch(error => {
                error = error.toString()
                Alert.errorAlert('历史订单未知错误: '+error)
                reject(error);
              })
          })
    },
    async getOrderAdData(data){
      try {
        const region = parseInt(cme_getRegion());
        const res = await HistoryApi.getOrderAdData({data, region});
        return res;
      } catch (e) {
        console.log(e)
      }
    },
    async getLast4(token){
      try {
        const res = await HistoryApi.getLast4(token);
        return res;

      } catch (e) {
        console.log(e)
      }
    },
// ===================================
// getVerifyCode input parameter
// ===================================
  async getHistoryDetail(io_data){
    try {
      const token = io_data.token;
      const iv_oid = io_data.oid;
      const reqData = {token,iv_oid};
      const res = await HistoryApi.getHistoryDetail(reqData);
      if(res.ev_error == 0){
      // if(res.result == 0){
        return res.ea_order_detail;
      }else{
          Alert.errorAlert(res.ev_message)
      }

    } catch (e) {
      console.log(e)
    }
  },


// ===================================
// getVerifyCode input parameter
// ===================================
// io_data:{ token, oid }
   async getVerifyCode(io_data){
    const token = io_data.token;
    const iv_oid = io_data.oid;
    const reqData = {token,iv_oid};
    const getVerifyCodeResult = await HistoryApi.getVerifyCode(reqData)
    const res = getVerifyCodeResult;
    if(res.result != 0){
      Alert.errorAlert(res.message)
    }
    return getVerifyCodeResult
  },
  async verifyPhone(io_data){
    const token = io_data.token;
    const iv_oid = io_data.oid;
    const iv_code = io_data.code;
    const reqData = {token,iv_oid,iv_code};
    const verifyPhoneResult = await HistoryApi.verifyPhone(reqData)
    const res = verifyPhoneResult;
    if(res.result != 0){
      // Alert.errorAlert(res.message)
    }
    return verifyPhoneResult
  },
  async addReview(io_data){
    try{
      if (!io_data.io_data.complete_time) {
        io_data.io_data.complete_time = 0;
      }
      const res = await HistoryApi.addReview(io_data);
      if(res.ev_error != 0){
        Alert.errorAlert(res.ev_message);
      }
      return res;
    }catch(e) {
      console.log(e)
    }
  },

  async changePaymentToCash(io_data){
    try{
      const res = await HistoryApi.changePaymentToCash(io_data);
      if(res.ev_error != 0){
        Alert.errorAlert(res.ev_message);
      }
      return res;
    }catch(e) {
      console.log(e)
    }
  },

  async viewOrderCase(io_data){
    try{
      const res = await HistoryApi.viewOrderCase(io_data);
      return res;
    }catch(e) {
      console.log(e)
    }
  },
  async changeOrderCase(io_data){
    try{
      const res = await HistoryApi.changeOrderCase(io_data);
      return res;
    }catch(e) {
      console.log(e)
    }
  },

      // ===================================
      // getHistoryData API INTERFACE
      // API             Module
      // ===================================
      // cell            cell
      // channel         channel
      // comment         comment
      // created         created
      // dltype          deliveryType
      // oid             orderId
      // ori_pretax      originalPretax
      // ori_total       originalTotal
      // pretax          pretax
      // rid             rid
      // rraddr          restaurantAddress
      // rrname          restaurantName
      // status          orderStatus
      // total           total
      // uaddr           userAddress
      // uaid            userAid
      // uid             userId
      // uname           username
      // version         version
      getHistoryData(token){
          return new Promise((resolve, reject) => {
            HistoryApi.getHistoryData(token)
              .then(data => {
                if(data.result == 0){
                    if(data.current){
                        const cell              = data.current.cell;
                        const channel           = data.current.channel;
                        const comment           = data.current.comment;
                        const created           = data.current.created;
                        const deliveryType      = data.current.dltype;
                        const orderId           = data.current.oid;
                        const originalPretax    = data.current.ori_pretax;
                        const originalTotal     = data.current.ori_total;
                        const orderStatus       = data.current.status;
                        const pretax            = data.current.pretax;
                        const rid               = data.current.rid;
                        const restaurantAddress = data.current.rraddr;
                        const restaurantName    = data.current.rrname;
                        const total             = data.current.total;
                        const userAddress       = data.current.uaddr;
                        const userAid           = data.current.uaid;
                        const userId            = data.current.uid;
                        const username          = data.current.uname;
                        const version           = data.current.version;

                        const current = {
                          cell,
                          channel,
                          comment,
                          created,
                          deliveryType,
                          orderId,
                          originalPretax,
                          originalTotal,
                          pretax,
                          rid,
                          restaurantAddress,
                          restaurantName,
                          orderStatus,
                          total,
                          userAddress,
                          userAid,
                          userId,
                          username,
                          version
                        }
                        data.current = Object.assign({},current);
                    }
                    resolve(data);
                }else{
                  Alert.errorAlert(data.message)
                  reject(data.result);
                }

              })
              .catch(error => {
                error = error.toString()
                Alert.errorAlert('历史订单未知错误: '+error)
                reject(error);
              })
          })
    }
}
module.exports = HistoryModule;
