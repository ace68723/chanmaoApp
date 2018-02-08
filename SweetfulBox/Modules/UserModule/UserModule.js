import UserAPI from './UserAPI';
import {GetUserInfo, InitUserInfo} from '../../../App/Modules/Database';
export default  {
  async getOrderHistory(io_data){
    const {uid,token,version} = GetUserInfo();
    io_data = {
      lastid:0,
    }
    // location:'get uuid from db',
    // uuid:'get uuid from db',
    try {
      const lo_data ={
        authortoken: token,
      }
      const orderHistory = await UserAPI.getOrderHistory(lo_data);

      if(orderHistory.ev_error === 0 ){
        const eo_data ={
          orderHistory:orderHistory.ea_order,
        }
        return eo_data
      }else{
        const errorMessage = orderHistory.ev_message;
        throw errorMessage
      }
    } catch (e) {

      const errorMessage = 'error';
      throw errorMessage
    }

  },

  async putUserAddr(io_data){
    const {uid,token,version} = GetUserInfo();
    try {
      const lo_data ={
        authortoken: token,
        iv_addr: io_data.addressObject.addr,
        iv_province: io_data.addressObject.province,
        iv_lat: io_data.addressObject.lat,
        iv_lng: io_data.addressObject.lng,
        iv_name: io_data.name,
        iv_unit: io_data.unitNumber,
        iv_tel:  io_data.phoneNumber,
      }
      const result = await UserAPI.putUserAddr(lo_data);
      if(result.ev_error === 0 ){
        return result
      }else{
        const errorMessage = result.ev_message;
        throw errorMessage
      }
    } catch (e) {
      console.log(e)
      const errorMessage = 'error';
      throw errorMessage
    }

  },

  checkUserLogin() {
     const {uid,token,version} = GetUserInfo();
     if (token.length > 0) {
       return false;
     }else {
       return true;
     }
  },
  clearToken() {
     const {uid,token,version} = InitUserInfo();
     return true;
  }

}
