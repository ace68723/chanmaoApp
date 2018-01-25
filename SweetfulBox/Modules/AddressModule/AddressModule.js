import AddressAPI from './AddressAPI';
const  DeviceInfo     = require('react-native-device-info');
export default  {
  async checkCanDeliver(lat,lng){
    try {
      const deliverInfo = await AddressAPI.checkCanDeliver(lat,lng);
      if(deliverInfo.ev_result === 0 ){
        return deliverInfo;
      }else{
        const errorMessage = deliverInfo.ev_message;
        throw errorMessage;
      }
    } catch (error) {
      throw error;
    }
  }
}
