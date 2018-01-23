import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import UserModule from '../Modules/UserModule/UserModule'
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
          dispatch({
            actionType: SboxConstants.PUT_USER_ADDR, data
          })
        }catch(error){

        }
      }
}
