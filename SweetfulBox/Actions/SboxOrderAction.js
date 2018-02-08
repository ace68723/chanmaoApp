import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import OrderModule from '../Modules/OrderModule/OrderModule'
import {sbox_getAllItemsFromCart} from '../Modules/Database'
export default {
    async addCard(reqData) {
      try{
         await OrderModule.addCard(reqData);
        const data = await OrderModule.getOrderBefore();
        dispatch({
             actionType: SboxConstants.SBOX_CHECKOUT,data
         })
      }catch(error){
        console.log(error)
        throw 'no cardToken'
      }
    },
    async getOrderBefore(){
        try{
          const data = await OrderModule.getOrderBefore();
          dispatch({
               actionType: SboxConstants.SBOX_CHECKOUT,data
           })
        }catch(error){
          console.log(error)
        }
      },
    async checkout() {
      try{

        const data = await OrderModule.checkout();
        dispatch({
            actionType: SboxConstants.SBOX_CHECKOUT, data
        })
      }catch(error){
        console.log(error)
      }
    },

}
