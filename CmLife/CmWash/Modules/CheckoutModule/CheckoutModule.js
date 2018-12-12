import CheckoutAPI from './CheckoutAPI';
import {
  NativeModules,
} from 'react-native';
import { GetUserInfo} from '../../../../App/Modules/Database';


export default  {
  async beforeOrder(io_data){
    try {
      const {uid,token,version} = GetUserInfo();
      const lo_data = {
        token:token,
        products:io_data.products,
      }
      const res = await CheckoutAPI.beforeOrder(lo_data);
      return res;
    } catch (e) {
      throw e
    }
  },
  async getCard(io_data){
    console.log('moduleeeee')
    try {

      const {uid,token,version} = GetUserInfo();

      const lo_data = {
        token:token,
      }
      // console.log(lo_data);
      const res = await CheckoutAPI.getCard(lo_data);
      // console.log(res);
      const eo_data ={
        ev_error:res.ev_error,
        eo_last4:res.eo_last4,
      }
      return eo_data
    } catch (e) {
      throw e
    }
  },
  async getDeliveryTime(io_data){
    try {

        const {uid,token,version} = GetUserInfo();
      const lo_data = {
        token:token,
        date:io_data.date,
        wash_time:io_data.wash_time,
      }
      // console.log(lo_data);
      const res = await CheckoutAPI.getDeliveryTime(lo_data);
      // console.log(res);
      const eo_data = {
        delivery_time:res.ea_delivery_time,
      }
      return eo_data
    } catch (e) {
      throw e
    }
  },
  async placeOrder(io_data){
    try {

      const {uid,token,version} = GetUserInfo();
      const lo_data = {
        token:token,
        'iv_method':1,
        'iv_location_id':io_data.location_id,
        'iv_pickup_date':io_data.pickup_date,
        'iv_pickup_time':io_data.pickup_time,
        'iv_delivery_date':io_data.delivery_date,
        'iv_delivery_time':io_data.delivery_time,
        'iv_comment':io_data.comment,
        'iv_products':io_data.products,
      }
      // console.log(lo_data);
      const res = await CheckoutAPI.placeOrder(lo_data);
      // console.log(res);
      const eo_data = {
        placeOrderStatus:res.ev_error,
      }
      return eo_data
    } catch (e) {
      throw e
    }
  },
}
