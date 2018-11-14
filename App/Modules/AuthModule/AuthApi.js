'use strict';

// const AuthConstants = require( './AuthConstants');

import AuthConstants from './AuthConstants';
const ERROR_NETWORK = AuthConstants.ERROR_NETWORK;
const postOptiopns = AuthConstants.postOptiopns;
// let getOptiopns = {}
let getOptiopns = AuthConstants.getOptiopns

const AuthApi = {
    AppLogin(userInfo){
        // const url = AuthConstants.API_LOGIN
        const url = 'https://www.cmapi.ca/cm_backend/index.php/api/v1/auth_login_phone';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        options.headers = Object.assign(options.headers,{
            cmos:userInfo.os,
            cmuuid:userInfo.uuid,
            appid: 2,
        })
        options.body = JSON.stringify({
          iv_username: userInfo.username,
          iv_password: userInfo.password
        })
        // options.headers = Object.assign(options.headers,{
        //     devicetoken:userInfo.deviceToken,
        //     Cmos:userInfo.os,
        //     Cmuuid:userInfo.uuid,
        //     Cmversion:userInfo.version
        // })
        // options.body = JSON.stringify({
        //   username: userInfo.username,
        //   password: userInfo.password
        // })
        return fetch(url,options)
                .then((res) => res.json())
                .catch((error) => {throw ERROR_NETWORK})
    },
    phoneRegister(io_data) {
      // const url = AuthConstants.API_LOGIN
      const url = 'https://www.cmapi.ca/cm_backend/index.php/api/v1/auth_register_user';
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      if (io_data.openid) {
        options.body = JSON.stringify({
          iv_num: io_data.phone,
          iv_verification_code: io_data.verification,
          iv_cty: 1,
          iv_openid: io_data.openid,
          iv_unionid: io_data.unionid,
          iv_refresh_token: io_data.refresh_token,
        })
      } else {
        options.body = JSON.stringify({
          iv_num: io_data.phone,
          iv_verification_code: io_data.verification,
          iv_cty: 1,
          iv_password: io_data.password,
          iv_email: io_data.email
        })
      }
      options.headers = Object.assign(options.headers,{
          cmos:io_data.cmos,
          appid:2
      })
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw ERROR_NETWORK})
    },
    sendVerification(io_data) {
      const url = 'https://www.cmapi.ca/cm_backend/index.php/api/v1/auth_send_vcode';
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers = Object.assign(options.headers,{
          cty:1,
          num:io_data.phone,
          appid:2
      })
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw ERROR_NETWORK})
    },
    AppAuth(userInfo){
      // const url = AuthConstants.API_AUTH;
      const url = 'https://www.cmapi.ca/cm_backend/index.php/api/v1/auth_login_wc';
      let options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      }
      if(userInfo.authortoken){

          options.headers = Object.assign(options.headers,{
              authortoken:userInfo.authortoken,
              appid:2
          })

      }else if (userInfo.resCode){
          options.headers = Object.assign(options.headers,{
              rescode:userInfo.resCode,
          })
      }
      // if(userInfo.token){
      //
      //     options.headers = Object.assign(options.headers,{
      //         authortoken:userInfo.token
      //     })
      //
      // }else if (userInfo.rescode){
      //     options.headers = Object.assign(options.headers,{
      //         rescode:userInfo.rescode,
      //         devicetoken:userInfo.deviceToken
      //     })
      // }
      // options.headers = Object.assign(options.headers,{
      //   Cmos:userInfo.os,
      //   Cmuuid:userInfo.uuid,
      //   Cmversion:userInfo.version
      // })
      // var d = new Date();
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw ERROR_NETWORK})
    },
    getVcode(io_data)
    {

      const url = 'https://www.cmapi.ca/cm_backend/index.php/api/v1/auth_send_vcode_reset_password';
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              cty:1,
              num:io_data.num,
              appid:2
          }
      }
      // options.headers = Object.assign(options.headers,{
      //     devicetoken:userInfo.deviceToken,
      //     Cmos:userInfo.os,
      //     Cmuuid:userInfo.uuid,
      //     Cmversion:userInfo.version
      // })
      // options.body = JSON.stringify({
      //   username: userInfo.username,
      //   password: userInfo.password
      // })

      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw ERROR_NETWORK})
    },
    resetPassword(io_data)
    {
      const url = 'https://www.cmapi.ca/cm_backend/index.php/api/v1/reset_password';
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      }
      // options.headers = Object.assign(options.headers,{
      //     devicetoken:userInfo.deviceToken,
      //     Cmos:userInfo.os,
      //     Cmuuid:userInfo.uuid,
      //     Cmversion:userInfo.version
      // })
      options.headers = Object.assign({}, {
          appid:2
      })
      // options.body = JSON.stringify({
      //   username: userInfo.username,
      //   password: userInfo.password
      // })
      options.body = JSON.stringify({
        "iv_verification_code": io_data.iv_verification_code,
        "iv_password": io_data.iv_password,
        "iv_cty": "1",
        "iv_num": io_data.iv_num,
      })
      return fetch(url,options)
              .then((res) => {
                console.log(res);
                console.log(res.json());
                return res.json();
              })
              .catch((error) => {throw ERROR_NETWORK})
    },
    bindPhone(io_data) {
      const url = 'https://www.cmapi.ca/cm_backend/index.php/api/v1/auth_register_addphone';
      let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      }
      options.headers = Object.assign(options.headers,{
          authortoken:io_data.authortoken,
          appid:2
      })
      options.body = JSON.stringify({
        iv_num: io_data.phone,
        iv_verification_code: io_data.verification,
        iv_cty: io_data.cty,
        iv_openid: io_data.openid,
      })
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw ERROR_NETWORK})
    }
}

module.exports = AuthApi;
