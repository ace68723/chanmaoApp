import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import HistoryModule from '../Modules/HistoryModule/HistoryModule';
import AuthModule from '../../App/Modules/AuthModule/Auth';
import { cme_getCommentCount, cme_updateCommentCount } from '../../App/Modules/Database';
export default {
    async addReview(io_data){
      try{
        const token = await AuthModule.getToken();
        const lo_data = {io_data,token};
        const data = await HistoryModule.addReview(lo_data);
        data.toStoreReview = false;
        const commentCount = await cme_getCommentCount();
        if (commentCount === 0) {
          if (io_data.driver_score === 5 && io_data.restaurant_score === 5) {
            data.toStoreReview = true;
          }
          await cme_updateCommentCount();
        }
        dispatch({
            actionType: AppConstants.REVIEW_ADDED, data
        })
      }catch (e){
        console.log(e);
      }
    },


}
