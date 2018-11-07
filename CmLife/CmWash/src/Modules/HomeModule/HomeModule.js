import HomeAPI from './HomeAPI';
import {
  NativeModules,
} from 'react-native';



export default  {
  async getProductList(){
    try {

      const lo_data = {

      }
      console.log('HomeModule')
      const res = await HomeAPI.getProductList();
      if(res.ev_error === 1) { throw 'add card fail'}
      const eo_data = res;
      console.log(res);
      return eo_data
    } catch (e) {
      throw e
    }
  },
}
