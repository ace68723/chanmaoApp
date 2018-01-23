import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import UserModule from '../Modules/UserModule/UserModule'
export default {
    async getOrderHistory(){
        try{

          const data = await UserModule.getOrderHistory();
          
          dispatch({
              actionType: SboxConstants.GET_ORDER_HISTORY, data
          })
        }catch(error){

        }
      },
}
