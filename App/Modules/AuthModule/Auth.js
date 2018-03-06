'use strict';


const  AuthApi        = require( './AuthApi');
const  AuthConstants  = require( './AuthConstants');
const  AuthStore      = require( './AuthStore');
const  AppConstants   = require('../../Constants/AppConstants')
const  DeviceInfo     = require('react-native-device-info');
import {
  SaveUserInfo,
  InitUserInfo,
  GetUserInfo,
  LogOut,
} from '../Database';
// version
const VERSION         = AppConstants.CMVERSION;
//constants
const ERROR_STORE     = AuthConstants.ERROR_STORE;
const ERROR_NETWORK   = AuthConstants.ERROR_NETWORK;
const ERROR_PASSWORD  = AuthConstants.ERROR_PASSWORD;
const ERROR_AUTH      = AuthConstants.ERROR_AUTH;
const SUCCESS         = AuthConstants.SUCCESS;
const FAIL            = AuthConstants.FAIL;
const SUCCESS_LOGIN   = AuthConstants.SUCCESS_LOGIN;
const TOKEN           = AuthConstants.TOKEN;
const UID             = AuthConstants.UID;
const STARTED         = AuthConstants.STARTED;
// message
const ERROR_NETWORK_MESSAGE   = AuthConstants.ERROR_NETWORK_MESSAGE;
const ERROR_PASSWORD_MESSAGE  = AuthConstants.ERROR_PASSWORD_MESSAGE;
const ERROR_AUTH_MESSAGE      = AuthConstants.ERROR_AUTH_MESSAGE;
const ERROR_STORE_MESSAGE     = AuthConstants.ERROR_STORE_MESSAGE;

let loginStarted = false;
let authStarted = false;
const AuthModule = {

    async doAuth(){
        const data = GetUserInfo();
        const reqData = formatAuth(data);
        const res = await AuthApi.AppAuth(reqData);
        if (res.result === 0) {
          return res;
        }else{
          InitUserInfo();
          throw res;
        }
    },

    async AppLogin(io_data){
          const username = io_data.username;
          const password = io_data.password;
          const deviceToken = io_data.deviceToken;
          const data = {username,password,deviceToken}
          const userInfo = formatLogin(data)
          const res = await AuthApi.AppLogin(userInfo)
          if (res.result === 0) {
            SaveUserInfo({uid:res.uid, token:res.token});
            console.log(res);
            return res;
          }else{
            InitUserInfo();
            throw res;
          }
    },

    async AppDoWechatAuth(io_data){
      var d = new Date();
      const deviceToken = io_data.deviceToken;
      const resCode     = io_data.resCode;
      const userInfo = formatWecahtAuth(resCode,deviceToken)
      const res = await AuthApi.AppAuth(userInfo)
      if (res.result === 0) {
        SaveUserInfo({uid:res.uid, token:res.token});
        return res;
      }else{
        InitUserInfo();
        throw res;
      }
    },
    isAuthed() {
      const userInfo = GetUserInfo()
      if(!userInfo.token) return false;
      return true;
    },
    async getToken() {
      try {
        const token = await GetUserInfo().token
        return token
      } catch (e) {
        console.log(e)
      }
    },
    async logout(){
        LogOut();
    }
}
const loginResult = (res) => {
        var d = new Date();
        if(res.result == FAIL){
            throw res
         }else{
            let la_data = [
              [TOKEN, res.token],
              [UID, res.uid]
            ]
            return la_data
         }
}
const getSuccess = () => {
    const success = Object.assign({},{
      result: SUCCESS,
      message: SUCCESS_LOGIN
    });
    return success
}
const getError = (error) => {
  switch (error) {
    case ERROR_NETWORK:
      error = Object.assign({},{
        result: FAIL,
        message: ERROR_NETWORK_MESSAGE
      });
      return error
      break
    case ERROR_PASSWORD:
      error = Object.assign({},{
        result: FAIL,
        message: ERROR_PASSWORD_MESSAGE
      });
      return error
      break
    case ERROR_STORE:
      error = Object.assign({},{
        result: FAIL,
        message: ERROR_STORE_MESSAGE
      });
      return error
      break
    case STARTED:
      error = Object.assign({},{
        result: FAIL,
        message: STARTED
      });
      return error
      break
      case ERROR_AUTH:
        error = Object.assign({},{
          result: FAIL,
          message: ERROR_AUTH_MESSAGE
        });
        return error
        break

    default:

    }
}
const formatLogin = (io_data) => {

  const userInfo = Object.assign({},{
    os:    DeviceInfo.getModel() +" | " +
           DeviceInfo.getSystemName() +" | " +
           DeviceInfo.getSystemVersion() +" | " +
           DeviceInfo.getDeviceName(),
    deviceToken:io_data.deviceToken,
    username:io_data.username,
    password:io_data.password,
    uuid: DeviceInfo.getUniqueID(),
    version : VERSION
  });

  return userInfo
}
const formatAuth = (data) => {
  const userInfo = Object.assign({},{
    os:  DeviceInfo.getModel() +" | " +
           DeviceInfo.getSystemName() +" | " +
           DeviceInfo.getSystemVersion() +" | " +
           DeviceInfo.getDeviceName(),
    token: data.token,
    uuid: DeviceInfo.getUniqueID(),
    version : data.version
  });

  return userInfo
}
const formatWecahtAuth = (resCode,deviceToken) => {
  const userInfo = Object.assign({},{
    deviceToken:deviceToken,
    os:  DeviceInfo.getModel() +" | " +
           DeviceInfo.getSystemName() +" | " +
           DeviceInfo.getSystemVersion() +" | " +
           DeviceInfo.getDeviceName(),
    rescode: resCode,
    uuid: DeviceInfo.getUniqueID(),
    version : VERSION
  });
  return userInfo
}
const authResult = (res) => {
  return new Promise((resolve, reject) => {
    console.log(res)
      if(res.result == FAIL){
        AuthStore.removeData([TOKEN, UID])
          .then(()=>{
              reject(res)
          })
          .catch((error)=>{
             reject(error)
          })
      }else{
        resolve()
      }

  })


}
const getToken = () => {
  return new Promise((resolve, reject) => {
    AuthStore.getData([TOKEN, UID])
      .then((data) => {
         resolve(data)
      })
      .catch((error) =>{
        reject (error);
      })
   })
}

// const doRequest = (port) =>{
//
// }
module.exports = AuthModule;
