import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import HomeModule from '../Modules/HomeModule/HomeModule';
import LocationModule from '../../App/Modules/System/LocationModule';
import AuthModule from '../../App/Modules/AuthModule/Auth';
import { cme_getSelectedAddress, cme_getHomeIntroCount, cme_updateHomeIntroCount } from '../../App/Modules/Database';
export default {
     async getHomeData(){
        try{

          const token = await AuthModule.getToken();
          const homeData = await HomeModule.getHomeData(token);
          const homeAlert = await HomeModule.getHomeAlert(token);
          const selectedAddress = cme_getSelectedAddress();
          let userloc;
          if (selectedAddress) {
            userloc =  selectedAddress.loc_la +','+selectedAddress.loc_lo;
          } else {
             userloc = await LocationModule.getCurrentPosition();
          }
          const reqData = {token,userloc}
          // const areaList = await HomeModule.getAreaList(reqData);
          const restaurantListInfo = await HomeModule.getRestaurantList(reqData);
          const restaurantList = restaurantListInfo.restaurantList;
          const zones = restaurantListInfo.zones;
          const categories = restaurantListInfo.categories;
          
          let showIntroduction = true;
          const introCount = await cme_getHomeIntroCount();
          if (introCount < 3) {
            await cme_updateHomeIntroCount();
          }
          else {
            showIntroduction = false;
          }
          const res = {homeData,showIntroduction, restaurantList, zones,categories, homeAlert}
          dispatch({
              actionType: AppConstants.GET_HOME_DATA, res
          });
        }catch (e){
          console.log(e);
        }
      },

}
