import OrderAPI from './OrderAPI';
import {
  NativeModules,
} from 'react-native';

import { GetUserInfo} from '../../../../App/Modules/Database';

export default  {
  async getHistoryOrder(authortoken){
    try {
      const {uid,token,version} = GetUserInfo();
      console.log(token);
      console.log('OrderModule')
      const lo_data = {
        authortoken:token,
      }
      const res = await OrderAPI.getHistoryOrder(lo_data);
      if(res.ev_error === 1) { throw 'add card fail'}
      const ea_orders = res.ea_orders;
      return ea_orders;
    } catch (e) {
      throw e
    }
  },
}
