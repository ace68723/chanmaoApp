import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import ProductModule from '../Modules/ProductModule/ProductModule'
export default {
    async getSingleProduct(io_data){
        try{
          const io_data = {

          }
          const data = await ProductModule.getSingleProduct(io_data);

          dispatch({
              actionType: SboxConstants.GET_SINGLE_PRODUCT, data
          })
        }catch(error){

        }
      },
}
