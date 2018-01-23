import UserAPI from './UserAPI';

export default  {
  async getOrderHistory(io_data){
    io_data = {
      lastid:0,
    }
    // location:'get uuid from db',
    // uuid:'get uuid from db',
    try {
      const lo_data ={
        authortoken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY",
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
    io_data = {
      lastid:0,
    }
    // location:'get uuid from db',
    // uuid:'get uuid from db',
    try {
      const lo_data ={
        authortoken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY",
        iv_cbid: 1,
        iv_name: "Jacob",
        iv_unit: "1211g",
        iv_tel: "6477777777",
      }
      const result = await UserAPI.putUserAddr(lo_data);



      if(result.ev_error === 0 ){
        

      }else{
        const errorMessage = result.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  }

}
