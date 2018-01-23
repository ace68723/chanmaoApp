import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import OrderModule from '../Modules/OrderModule/OrderModule'
export default {
    async getOrderBefore(io_data){
        try{
          const lo_data = {
            authortoken:io_data.authortoken,
            ia_prod:io_data.ia_prod
          }

          const data = await OrderModule.getOrderBefore(lo_data);

          dispatch({
              actionType: SboxConstants.GET_ORDER_BEFORE, data
          })
        }catch(error){

        }
      }
}
