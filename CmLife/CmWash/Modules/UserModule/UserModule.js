import UserAPI from './UserAPI';
import {GetUserInfo} from '../../../../App/Modules/Database';
export default  {


  async putUserAddr(io_data){
    const {uid,token,version} = GetUserInfo();
    try {
      const lo_data ={
        authortoken: token,
        iv_addr: io_data.addressObject.addr,
        iv_province: io_data.addressObject.province,
        iv_lat: io_data.addressObject.lat.toString(),
        iv_lng: io_data.addressObject.lng.toString(),
        iv_name: io_data.name,
        // iv_unit: io_data.unitNumber,
        iv_phone:  io_data.phoneNumber,
      }
      const result = await UserAPI.putUserAddr(lo_data);
      console.log(result);
      if(result.ev_error === 0 ){
        let res={
          eo_user:result.eo_user,
        }
        return res
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


}
