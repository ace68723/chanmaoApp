import SboxHistoryAPI from './SboxHistoryAPI';
import {GetUserInfo} from '../../../App/Modules/Database';
export default  {

  async getHistoryList(){
    try {
      const {uid,token,version} = GetUserInfo();
      const lo_data ={
        authortoken: token,
      }
      const res = await SboxHistoryAPI.getHistoryList(lo_data);
      for (let lo_order of res.ea_order){
        lo_order = Object.assign(lo_order, {key:lo_order.obid})
      }
      return res.ea_order;
    } catch (e) {
      throw e;
    }
  }
}
