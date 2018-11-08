import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';

import HistoryModule from '../Modules/HistoryModule/HistoryModule';
import {NativeModules} from 'react-native';
export default {

    async HistoryOrder(io_data) {
      try{
        const data = await HistoryModule.HistoryOrder(io_data);
        console.log(data);
        dispatch({
             actionType: AppConstants.HISTORY_LIST,data
         })
      }catch(error){
        console.log(error)
        throw error;
      }
    },

}
