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

const CommentsApi = {
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

}

module.exports = CommentsApi;
