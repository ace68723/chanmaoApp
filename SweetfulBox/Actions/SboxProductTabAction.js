import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import SboxProductTabModule from '../Modules/SboxProductTabModule/SboxProductTabModule';
export default {
  async getProductList(io_data){
      try{
        const data = await SboxProductTabModule.getProductList(io_data);
        // console.log(data)
        dispatch({
            actionType: SboxConstants.GET_PRODUCT_LIST, data
        })
      }catch(error){
        console.log(error)
      }
    },
}
