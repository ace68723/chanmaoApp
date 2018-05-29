'use strict';

const AuthConstants = require( '../AuthModule/AuthConstants');

const ERROR_NETWORK   = AuthConstants.ERROR_NETWORK;
let postOptiopns = AuthConstants.postOptiopns
let getOptiopns = {
    method: 'POST',
    mode:'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const HistoryApi = {
  getOrderData(token){
    const url = AuthConstants.API_HISTORYORDER
    let options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    options.headers.authortoken = token;
    // options.body = JSON.stringify({channel:1});
    // options.body = JSON.stringify({channel: 1})
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
    getHistoryDetail(reqData){
      const url = AuthConstants.API_GETHISTORYDETAIL
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      const oid = reqData.iv_oid
      options.body =  JSON.stringify({oid})
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getVerifyCode(reqData){
      const url = AuthConstants.API_GETVERIFYCODE
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      const iv_oid = reqData.iv_oid
      options.body =  JSON.stringify({iv_oid})
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    verifyPhone(reqData){
      const url = AuthConstants.API_VERIFYCODE
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      const iv_oid = reqData.iv_oid;
      const iv_code = reqData.iv_code;
      options.body =  JSON.stringify({iv_oid,iv_code});
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    addReview(reqData){
      const url = AuthConstants.API_ADDREVIEW
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      // const iv_oid = reqData.iv_oid;
      // const iv_code = reqData.iv_code;
      const complete_time = reqData.io_data.complete_time;
      const oid = reqData.io_data.oid;
      const driver_score = reqData.io_data.driver_score;
      const driver_comment = reqData.io_data.driver_comment;
      const restaurant_score = reqData.io_data.restaurant_score;
      const restaurant_comment = reqData.io_data.restaurant_comment;
      const dish_ratings = reqData.io_data.dish_ratings;
      options.body =  JSON.stringify({complete_time,
                                      oid,
                                      driver_score,
                                      driver_comment,
                                      restaurant_score,
                                      restaurant_comment,
                                      dish_ratings});
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    changePaymentToCash(reqData){
      // const url = AuthConstants.API_ADDREVIEW
      const url = AuthConstants.API_CHANGE_ORDER_TO_CASH;
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      options.headers.oid = reqData.io_data.oid;
      console.log(url);
      console.log(options);
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getHistoryData(token){
      const url = AuthConstants.API_HISTORYLIST
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      // options.body = JSON.stringify({channel:1});
      options.body = JSON.stringify({channel: 1})
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },

}

module.exports = HistoryApi;
