import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
// import UserModule from '../../Modules/UserModule/UserModule'
export default {
      async getSectionList(){
        try{
          lo_data.tpgs.map(tpgs => {
            const tpg_id = tpgs.tpg_id;
            const tpg_name = tpgs.tpg_name;
            const tpg_limit = tpgs.tpg_limit;
            const tps = tpgs.tps.map(tps => {
              const tp_id = tps.tp_id;
              const tp_name = tps.tp_name;
              const tp_price = tps.tp_price;
              const selected = false;
            });
          });
          var data = {
            optionsList: lo_data.tpgs
          }
          dispatch({
              actionType: AppConstants.GET_SECOND_MENU_DATA, data
          })
        }catch(error){

        }
      },
      updateTopping({tp_id,tpg_id}) {
        try{
          const data = {tp_id,tpg_id};
          dispatch({
              actionType: AppConstants.UPDATE_TOPPING, data
          })
        }catch(error){

        }
      },
      decreaseToppingQuantity({tp_id,tpg_id}) {
        try{
          const data = {tp_id,tpg_id};
          dispatch({
              actionType: AppConstants.DECREASE_TOPPING_QUANTITY, data
          })
        }catch(error){

        }
      },
      updateProductQty(difference) {
        try{
          const data = {"difference": difference};
          dispatch({
              actionType: AppConstants.UPDATE_PRODUCT_QTY, data
          })
        }catch(error){

        }
      }
}
