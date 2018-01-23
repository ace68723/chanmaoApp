import AddressAPI from './AddressAPI';

export default  {
  async getCondoList(io_data){
    // io_data = {
    //   lastid:0,
    // }
    // location:'get uuid from db',
    // uuid:'get uuid from db',
    lv_lastid = io_data.lastid ? io_data.lastid : 0;
    try {
      const lo_data ={
        location: '',
        uuid: 1,
        iv_lastid:lv_lastid ,
        iv_number:10,
      }
      const condoListResult = await AddressAPI.getCondoList(lo_data);



      if(condoListResult.ev_error === 0 ){
        const eo_data ={
          condoList:condoListResult.ea_condo,
        }
        return eo_data
      }else{
        const errorMessage = condoListResult.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  },

  async getCondoFuzzy(io_data){
    io_data = {
      iv_keyword: "York",
    }
    // location:'get uuid from db',
    // uuid:'get uuid from db',
    try {
      const lo_data ={
        uuid: 1,
        iv_keyword:io_data.iv_keyword,
      }
      const condoListResult = await AddressAPI.getCondoFuzzy(lo_data);


      if(condoListResult.ev_error === 0 ){
        const eo_data ={
          condoList:condoListResult.ea_condo,
        }
        return eo_data
      }else{
        const errorMessage = condoListResult.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  }
}
