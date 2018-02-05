import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import HomeModule from '../Modules/HomeModule/HomeModule';
import LocationModule from '../../App/Modules/System/LocationModule';
import AuthModule from '../../App/Modules/AuthModule/Auth';

export default {
     async getHomeData(){
        try{
          console.log("getHomeData1")
          const token = await AuthModule.getToken();
          console.log("getHomeData2")
          const homeData = await HomeModule.getHomeData(token);
          console.log("getHomeData3")
          const userloc = await LocationModule.getCurrentPosition();
          // const userloc =""
          const reqData = {token,userloc}
          console.log("getHomeData4")
          const areaList = await HomeModule.getAreaList(reqData);
            console.log("getHomeData end")
          // const areaList =''
          const res = {homeData,areaList}
          dispatch({
              actionType: AppConstants.GET_HOME_DATA, res
          })
        }catch (e){
          console.error(e);
        }
      },


}
