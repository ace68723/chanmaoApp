import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import SboxHistoryModule from '../Modules/SboxHistoryModule/SboxHistoryModule';
export default {
  async getHistoryList() {
      try{
        const data = await SboxHistoryModule.getHistoryList();
        dispatch({
            actionType: SboxConstants.GET_HISTORY_LIST, data
        });
      }catch(error){

      }
    },
}
