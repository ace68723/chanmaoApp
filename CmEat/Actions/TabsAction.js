import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';

export default {
     goToHistory(){
          dispatch({
              actionType: AppConstants.GO_TO_HISTORY
          })
      },
      tab_go_to_history(io_data) {
        try{
          const data = {
            paymentFail: io_data
          }
          dispatch({
              actionType: AppConstants.TAB_GO_TO_HISTORY, data
          })
        }catch (e){
          console.log(e)
        }
      }
}
