import OrderAPI from './OrderAPI';

export default  {
  async putUserAddr(io_data){
    io_data = {
      authortoken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY",
      ia_prod: [
    {
      "pbid": 1,
      "amount": 2
    }]
    }

    try {
      const lo_data ={
        authortoken: io_data.authortoken,
        ia_prod: io_data.ia_prod,
      }
      const orderBefore = await OrderAPI.getOrderBefore(lo_data);
      

      if(orderBefore.ev_error === 0 ){
        const eo_data ={
          cusid: orderBefore.ev_cusid,
          last4: orderBefore.ev_last4,
          oos: orderBefore.ev_oos,
          prod: orderBefore.ev_prod,
          addr: orderBefore.ev_addr,
        }
        return eo_data
      }else{
        const errorMessage = orderBefore.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  }
}
