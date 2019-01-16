// import AppConstants from '../Constants/AppConstants';
// // import {dispatch, register} from '../Dispatchers/AppDispatcher';
// import Auth from '../Modules/AuthModule/Auth';
// // import Alert from '../Components/General/Alert';

export default {
    async doLogin(io_data){
      try{
        // const {username,password,deviceToken} = io_data
        // const data                            = {username,password,deviceToken}
        // const res                             = await Auth.AppLogin(data)
        // return 'success'
      }catch(error){
        throw error
      }
    },
    async doAuth(){
          try{
            // const res = await Auth.doAuth()
            // if(res.result == 0){
            //   // dispatch({
            //   //     actionType: AppConstants.LOGIN_SUCCESS, res
            //   // })
            // }else{
            //   console.log(res)
            //   const errorMessage = res.message  || '验证失效,未知错误'
            //   throw errorMessage
            // }
          }catch(error){
            console.log(error)
            // Alert.errorAlert(error.message || '验证失败'+JSON.stringify(error))
          }
    },
    async doWechatAuth(io_data){
      try{
        // const deviceToken = io_data.deviceToken;
        // const resCode     = io_data.resCode;
        // const data        = {deviceToken,resCode};
        // const res         = await Auth.AppDoWechatAuth(data);
        // return 'success';
        // // dispatch({
        // //     actionType: AppConstants.LOGIN_SUCCESS, res
        // // })
      }catch(error){
        console.log(error)
      }
    },
    isAuthed(){
      try {
        // const res = Auth.isAuthed();
        // return res
      } catch (e) {

      }
    },
    logout(){
      try {
        // Auth.logout();
        // return res
      } catch (e) {

      }
    }
}
