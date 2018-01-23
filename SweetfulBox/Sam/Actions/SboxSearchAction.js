import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import ProductModule from '../Modules/ProductModule/ProductModule'
export default {
    async getCategoryList(showpm){
        try{
          const io_data = {
            showpm:showpm
          }
          const data = await ProductModule.getCategoryList(io_data);

          dispatch({
              actionType: SboxConstants.GET_CATEGORY_LIST, data
          })
        }catch(error){

        }
      },
      async searchCategoryList(io_data){
          try{
            const io_data = {
              number:1,
              lastid:1,
              cmid:1,
            }
            const data = await ProductModule.searchCategoryList(io_data);

            dispatch({
                actionType: SboxConstants.SEARCH_CATEGORY_LIST, data
            })
          }catch(error){

          }
        },
}
