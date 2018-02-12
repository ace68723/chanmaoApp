import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import UserModule from '../Modules/UserModule/UserModule'
import OrderModule from '../Modules/OrderModule/OrderModule'
import SboxOrderAction from './SboxOrderAction';
export default {
      async getOrderHistory(io_data){
        try{

          const data = await UserModule.getOrderHistory(io_data);

          dispatch({
              actionType: SboxConstants.GET_ORDER_HISTORY, data
          })
        }catch(error){

        }
      },

      async putUserAddr(io_data){
        try{
          const data = await UserModule.putUserAddr(io_data);
          const checkoutData = await OrderModule.getOrderBefore();
          dispatch({
               actionType: SboxConstants.SBOX_CHECKOUT,
               data:checkoutData
           })
          dispatch({
            actionType: SboxConstants.PUT_USER_ADDR, data
          })
        }catch(error){
          console.log(error)
        }
      },

      async checkUserLogin() {
        try{
          const data = await UserModule.checkUserLogin();
          dispatch({
            actionType: SboxConstants.UPDATE_USER_AUTH, data
          })
        }catch(error){

        }
      },
}
