import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import OrderModule from '../Modules/OrderModule/OrderModule'
import {sbox_getAllItemsFromCart} from '../Modules/Database'
export default {
    async addCard(reqData) {
      try{
        const data = await OrderModule.addCard(reqData);
        dispatch({
             actionType: SboxConstants.SBOX_UPDATECARD,data
         })
      }catch(error){
        console.log(error)
        throw 'no cardToken'
      }
    },
    async getOrderBefore(){
        try{
          const data = await OrderModule.getOrderBefore();
          console.log("getOrderBefore",data)
          dispatch({
               actionType: SboxConstants.SBOX_CHECKOUT,data
           })
        }catch(error){
          console.log(error)
        }
      },
    async checkout(box) {
      try{

        const data = await OrderModule.checkout(box);
        dispatch({
            actionType: SboxConstants.CHECKOUT, data
        })
      }catch(error){

        console.error(error)
        dispatch({
            actionType: SboxConstants.CHECKOUT_FAIL, error
        })
      }
    },

}
