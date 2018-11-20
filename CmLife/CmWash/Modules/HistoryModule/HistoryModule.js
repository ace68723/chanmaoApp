import HistoryAPI from './HistoryAPI';
import {
  NativeModules,
} from 'react-native';
import { GetUserInfo} from '../../../../App/Modules/Database';


export default  {
  async HistoryOrder(io_data){
    try {
      const {uid,token,version} = GetUserInfo();
      console.log(token);
      const lo_data = {
        token:token,
      }
      const res = await HistoryAPI.HistoryOrder(lo_data);
      const eo_data ={
        ea_orders:res.ea_orders,
      }
      return eo_data
    } catch (e) {
      throw e
    }
  },

}
