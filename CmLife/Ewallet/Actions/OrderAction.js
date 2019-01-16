import Constants from '../Constants/Constants';
import {dispatch, register} from '../Dispatchers/Dispatcher';
import OrderModule from '../Modules/OrderModule/OrderModule'
// import {sbox_getAllItemsFromCart} from '../Modules/Database'
export default {
    async addCard(reqData) {
      try{
         await OrderModule.addCard(reqData);
        const data = await OrderModule.getOrderBefore();
        dispatch({
             actionType: Constants.SBOX_CHECKOUT,data
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
               actionType: Constants.SBOX_CHECKOUT,data
           })
        }catch(error){
          console.log(error)
        }
      },
    async checkout(comment) {
      try{

        const data = await OrderModule.checkout(comment);
        dispatch({
            actionType: Constants.SBOX_CHECKOUT, data
        })
      }catch(error){
        console.log(error)
      }
    },

}
