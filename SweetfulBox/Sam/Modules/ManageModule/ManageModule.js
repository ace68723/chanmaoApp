import ManageAPI from './ManageAPI';

export default  {
  async getDailyRedis(io_data){
    io_data = {
      uuid:1
    }

    try {
      const lo_data ={
        uuid: io_data.uuid,
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
