import {
  Platform,
} from 'react-native';

import AppConstants from '../Constants/AppConstants';
// // import {dispatch, register} from '../Dispatchers/AppDispatcher';
import Auth from '../Modules/AuthModule/Auth';
import Alert from '../Components/General/Alert';


export default {
    async doLogin(io_data){
      try{
        const {username,password} = io_data;
        const data = {username,password};
        const res = await Auth.AppLogin(data);
        return res;
      }catch(error){
        console.log(error);
        throw error
      }
    },
    async phoneRegister(io_data) {
      try{
        let cmos;
        if (Platform.OS == 'ios') {
          cmos = 'ios';
        } else {
          cmos = 'android';
        }
        const {email,phone,verification,password} = io_data;
        const reqData = {email,phone,verification,password,cmos};
        const res = await Auth.phoneRegister(reqData);
        if (res.ev_error === 0) {
          return 'success'
        } else {
          if (res.ev_message === 10019) {
            Alert.errorAlert('Phone is already registered');
          }
        }
      }catch(error){
        setTimeout( () => {
           Alert.errorAlert('注册失败, 请重新尝试')
        }, 1000);
      }
    },
    async doAuth(){
          try{
            const res = await Auth.doAuth()
            if(res.result == 0){
              // dispatch({
              //     actionType: AppConstants.LOGIN_SUCCESS, res
              // })
            }else{
              const errorMessage = res.message  || '验证失效,未知错误'
              throw errorMessage
            }
          }catch(error){
            console.log(error)
            // Alert.errorAlert(error.message || '验证失败'+JSON.stringify(error))
          }
    },
    async doWechatAuth(io_data){
      try{
        console.log(io_data);
        const res         = await Auth.AppDoWechatAuth(io_data);
        return res;
        // dispatch({
        //     actionType: AppConstants.LOGIN_SUCCESS, res
        // })
      }catch(error){
        console.log(error)
      }
    },
    async sendVerification(io_data) {
      try{
        const res = await Auth.sendVerification(io_data);
        if (res.ev_error == 0) {
          return res;
        } else {
          if (res.ev_message == 10019) {
            Alert.errorAlert('Phone is already registered');
          } else if (res.ev_message == 10020) {
            Alert.errorAlert('Can send verification code 3 times only per day');
          }
        }
      }catch(error){
        console.log(error)
        Alert.errorAlert('Send verification code failed');
      }
    },
    async bindPhone(io_data) {
      try{
        let res;
        if (io_data.openid && io_data.unionid && io_data.refresh_token) {
          res = await Auth.phoneRegister(io_data);
        } else {
          res = await Auth.bindPhone(io_data);
        }
        return res;
      }catch(error){
        console.log(error)
      }
    },
    isAuthed(){
      try {
        const res = Auth.isAuthed();
        return res
      } catch (e) {

      }
    },
    logout(){
      try {
        Auth.logout();
        return res
      } catch (e) {

      }
    }
}
