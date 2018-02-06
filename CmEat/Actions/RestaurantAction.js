import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import AuthModule from '../../App/Modules/AuthModule/Auth';
import LocationModule from '../Modules/System/LocationModule';
import RestaurantModule from '../Modules/RestaurantModule/RestaurantModule';


export default {

    // getMenuSuccess(menu){
    //   dispatch({
    //       actionType: AppConstants.GET_MENU_SUCCESS, menu
    //   })
    // },
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
