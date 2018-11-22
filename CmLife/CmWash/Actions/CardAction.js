import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import CardModule from '../Modules/CardModule/CardModule'
// import {sbox_getAllItemsFromCart} from '../Modules/Database'
export default {
    async addCard(reqData) {
      try{
         const data = await CardModule.addCard(reqData);
         console.log(data);
         dispatch({
              actionType: AppConstants.CARD_NUMBER,data
          })
        // const data = await CardModule.getOrderBefore();
      }catch(error){
        console.log(error)
        throw error;
      }
    },

}
