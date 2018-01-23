import AddressAPI from './AddressAPI';
import LocationModule from '../../../App/Modules/System/LocationModule';
const  DeviceInfo     = require('react-native-device-info');
export default  {
  async getCondoList(io_data){
    // io_data = {
    //   lastid:0,
    // }
    // location:'get uuid from db',
    // uuid:'get uuid from db',
    lv_lastid = io_data.lastid ? io_data.lastid : 0;
    const userloc = await LocationModule.getCurrentPosition();
    try {
      const lo_data ={
        location: userloc,
        uuid: DeviceInfo.getUniqueID(),
        iv_lastid:lv_lastid ,
        iv_number:10,
      }
      const condoListResult = await AddressAPI.getCondoList(lo_data);
      if(condoListResult.ev_error === 0 ){
        for (let lo_condo of condoListResult.ea_condo) {
          lo_condo = Object.assign(lo_condo, {key: lo_condo.cbid, selected: false});
        }
        const eo_data = {
          condoList: condoListResult.ea_condo,
        };
        return eo_data;
      }else{
        const errorMessage = condoListResult.ev_message;
        throw errorMessage;
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage;
    }

  },

  async getCondoFuzzy(io_data){
    try {
      const userloc = await LocationModule.getCurrentPosition();
      let condoListResult;
      if (io_data.keyword.length === 0) {
        const lo_data ={
          location: userloc,
          uuid: 1,
          iv_lastid:0 ,
          iv_number:10,
        }
        condoListResult = await AddressAPI.getCondoList(lo_data);
      }
      else {
        const lo_data ={
          uuid: DeviceInfo.getUniqueID(),
          iv_keyword: io_data.keyword,
        }
        condoListResult = await AddressAPI.getCondoFuzzy(lo_data);
      }
      if(condoListResult.ev_error === 0 ){
        for (let lo_condo of condoListResult.ea_condo) {
          lo_condo = Object.assign(lo_condo, {key: lo_condo.cbid, selected: false});
        }
        const eo_data = {
          condoList: condoListResult.ea_condo,
          textInput: io_data.keyword,
        };
        return eo_data;
      }else{
        const errorMessage = condoListResult.ev_message;
        throw errorMessage;
      }
    } catch (e) {
      const errorMessage = 'error error';
      throw errorMessage;
    }

  }
}
