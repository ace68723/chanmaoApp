import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';

import HomeModule from '../Modules/HomeModule/HomeModule';
import {NativeModules} from 'react-native';
export default {

    async getProductList() {
      try{
        const data = await HomeModule.getProductList();
        dispatch({
             actionType: AppConstants.PRODUCT_LIST,data
         })
      }catch(error){
        console.log(error)
        throw 'no cardToken'
      }
    },

}
