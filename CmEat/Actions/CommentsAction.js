import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import HistoryModule from '../Modules/HistoryModule/HistoryModule';
import AuthModule from '../../App/Modules/AuthModule/Auth';
export default {
    async addReview(io_data){
      try{
        const token = await AuthModule.getToken();
        const lo_data = {io_data,token};
        const data = await HistoryModule.addReview(lo_data);
        dispatch({
            actionType: AppConstants.REVIEW_ADDED, data
        })
      }catch (e){
        console.log(e);
      }
    },


}
