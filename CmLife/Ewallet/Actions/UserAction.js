import Constants from '../Constants/Constants';
import {dispatch, register} from '../Dispatchers/Dispatcher';
import UserModule from '../Modules/UserModule/UserModule'
import OrderModule from '../Modules/OrderModule/OrderModule'
import OrderAction from './OrderAction';
export default {
      async getOrderHistory(io_data){
        try{

          const data = await UserModule.getOrderHistory(io_data);

          dispatch({
              actionType: Constants.GET_ORDER_HISTORY, data
          })
        }catch(error){

        }
      },

      async putUserAddr(io_data){
        try{
          const data = await UserModule.putUserAddr(io_data);
          const checkoutData = await OrderModule.getOrderBefore();
          dispatch({
               actionType: Constants.SBOX_CHECKOUT,
               data:checkoutData
           })
          dispatch({
            actionType: Constants.PUT_USER_ADDR, data
          })
        }catch(error){
          console.log(error)
        }
      },

      async checkUserLogin() {
        try{
          const data = await UserModule.checkUserLogin();
          dispatch({
            actionType: Constants.UPDATE_USER_AUTH, data
          })
        }catch(error){

        }
      },
}
