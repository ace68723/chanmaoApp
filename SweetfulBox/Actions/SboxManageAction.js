import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import ManageModule from '../Modules/ManageModule/ManageModule'
export default {
    async getDailyRedis(uuid){
        try{
          const io_data = {
            uuid:uuid
          }
          const data = await ManageModule.getDailyRedis(io_data);

          dispatch({
              actionType: SboxConstants.GET_DAILY_REDIS, data
          })
        }catch(error){

        }
      }
}
