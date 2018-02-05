import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import OrderModule from '../Modules/OrderModule/OrderModule'
import {sbox_getAllItemsFromCart} from '../Modules/Database'
export default {
    async getOrderBefore(){
        try{
          const data = await OrderModule.getOrderBefore();
          const {shouldDoAuth,soldOut} = data;
          if(shouldDoAuth) {
            dispatch({
                actionType: SboxConstants.SHOULD_DO_AUTH
            })
          }else if(soldOut) {
            dispatch({
                actionType: SboxConstants.SOLD_OUT
            })
            dispatch({
                actionType: SboxConstants.UPDATE_CART_ITEM_QUANTITY
            })
            dispatch({
              actionType: SboxConstants.UPDATE_CART_TOTAL_QUANTITY
            })
          } else {
            dispatch({
                actionType: SboxConstants.GET_ORDER_BEFORE, data
            })
          }

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
