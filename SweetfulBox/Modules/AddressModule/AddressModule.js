import AddressAPI from './AddressAPI';
const  DeviceInfo     = require('react-native-device-info');
export default  {
  async checkCanDeliver(lat,lng){
    try {
      const deliverInfo = await AddressAPI.checkCanDeliver(lat,lng);
      console.log("In module, error: ", deliverInfo.ev_error);
      console.log("In module, ev_can_deliver ", deliverInfo.ev_can_deliver);
      if(deliverInfo.ev_error === 0 ){
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
