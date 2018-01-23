import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import SboxHistoryModule from '../Modules/SboxHistoryModule/SboxHistoryModule';
export default {
  async init() {
      try{
        // const io_data = {
        //   lv_id:lv_id
        // }

        const data = await SboxHistoryModule.getInitData();
        dispatch({
            actionType: SboxConstants.GET_HISTORY_LIST, data
        });
      }catch(error){

      }
    },
}
