import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import AuthModule from '../../App/Modules/AuthModule/Auth';
import RestaurantModule from '../Modules/RestaurantModule/RestaurantModule';


export default {
    async getMenu(rid){
      try{
          const token = await AuthModule.getToken();
          const reqData = {rid,token}
          const menuData = await RestaurantModule.getMenu(reqData)
          dispatch({
              actionType: AppConstants.GET_MENU_SUCCESS, menuData
          })
      }catch (e){
      }
    },
}
