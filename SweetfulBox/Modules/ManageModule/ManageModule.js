import ManageAPI from './ManageAPI';
const  DeviceInfo     = require('react-native-device-info');
export default  {
  async getDailyRedis(io_data){
    io_data = {
      uuid:DeviceInfo.getUniqueID(),
    }

    try {
      const lo_data ={
        uuid: DeviceInfo.getUniqueID(),
      }
      const dailyRedis = await ManageAPI.getDailyRedis(lo_data);


      if(dailyRedis.ev_error === 0 ){

      }else{
        const errorMessage = dailyRedis.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  }
}
