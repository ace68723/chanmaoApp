import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import OrderModule from '../Modules/OrderModule/OrderModule'
import {sbox_getAllItemsFromCart} from '../Modules/Database'
export default {
    async getOrderBefore(productList){
        try{
          const lo_data = {
            productList:productList
          }
          const data = Object.assign({},await OrderModule.getOrderBefore(lo_data),{shouldDoAuth:false});
          dispatch({
              actionType: SboxConstants.GET_ORDER_BEFORE, data
          })
        }catch(error){
          console.error(error)
          const data = {shouldDoAuth:true}
          dispatch({
              actionType: SboxConstants.GET_ORDER_BEFORE, data
          })
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
    async getProductList() {
      try{
        const data = sbox_getAllItemsFromCart();
        dispatch({
            actionType: SboxConstants.GET_PRODUCT_LIST, data
        })
      }catch(error){
        console.log(error);
      }
    },
    async checkProductStatus(productList) {
      try{
        const data = {
          'productList': productList,
        }
        dispatch({
            actionType: SboxConstants.CHECK_PRODUCT_STATUS, data
        })
      }catch(error){
        console.log(error);
      }
    }
}
