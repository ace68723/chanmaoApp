import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import CardModule from '../Modules/CardModule/CardModule'
// import {sbox_getAllItemsFromCart} from '../Modules/Database'
export default {
    async addCard(reqData) {
      try{
         await CardModule.addCard(reqData);
        // const data = await CardModule.getOrderBefore();
      }catch(error){
        console.log(error)
        throw 'no cardToken'
      }
    },

}
