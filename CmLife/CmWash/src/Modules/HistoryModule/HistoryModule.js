import HistoryAPI from './HistoryAPI';
import {
  NativeModules,
} from 'react-native';



export default  {
  async HistoryOrder(io_data){
    try {

      const lo_data = {
        token:io_data.token,
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
