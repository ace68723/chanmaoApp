import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {sbox_getAllItemsFromCart, sbox_addQuantity, sbox_subQuantity, sbox_deleteItem} from '../Modules/Database';
export default {
     getAllItemsFromCart(lastid){
        try{
          const data =  sbox_getAllItemsFromCart();

          // dispatch({
          //     actionType: SboxConstants.GET_CONDO_LIST, data
          // })
        }catch(error){

        }
      },
      addQuantity(item){
        if(item.sku_quantity>=item.sku_amount) return;
        sbox_addQuantity(item)
        dispatch({
            actionType: SboxConstants.UPDATE_CART_ITEM_QUANTITY
        })
      },
      subQuantity(item){
        if(item.sku_quantity<=1) return;
        sbox_subQuantity(item)
        dispatch({
            actionType: SboxConstants.UPDATE_CART_ITEM_QUANTITY
        })
      },
      deleteItem(item){
        console.log(item)
        sbox_deleteItem(item)
        dispatch({
            actionType: SboxConstants.UPDATE_CART_ITEM_QUANTITY
        })
      }
}
